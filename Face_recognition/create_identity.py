import cv2
from deepface import DeepFace
from deepface.detectors import FaceDetector
from deepface.commons import functions
import os
import numpy as np

IDENTITY_NAME = "dat"
VIDEO_DIR = '/dev/video1'
# VIDEO_DIR = r"rtmp://localhost/live/STREAM_NAME.flv"
DATABASE_DIR = r'./database_arcface'


def create_identity_folder(database_dir, identity_name):
    identity_folder = os.path.join(database_dir, identity_name)

    if os.path.isdir(identity_folder):
        print("Same identity name")
        return False, None, None
    os.mkdir(identity_folder)
    embedding_folder_name = os.path.join(identity_folder, "embedding")
    images_folder_name = os.path.join(identity_folder, "images")
    os.mkdir(embedding_folder_name)
    os.mkdir(images_folder_name)
    return True, embedding_folder_name, images_folder_name


result, embedding_folder, images_folder = create_identity_folder(DATABASE_DIR, IDENTITY_NAME)

if result:
    cap = cv2.VideoCapture(VIDEO_DIR)
    detector_backend = 'ssd'
    face_detector = FaceDetector.build_model(detector_backend)

    model_name = 'ArcFace'
    model_recognition = DeepFace.build_model(model_name)
    input_shape_x, input_shape_y = functions.find_input_shape(model_recognition)

    num_of_saved_image = 0
    images = []

    while cap.isOpened():
        ret, frame = cap.read()

        if ret:
            # frame = cv2.resize(frame, (640, 480))
            # frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)
            face, _ = FaceDetector.detect_face(face_detector, detector_backend, frame, align=False)

            if face is not None and len(face) != 0:
                face = np.true_divide(face, 255)
                cv2.imshow("Face", face)
                saved_path = os.path.join(images_folder, "image_" + str(num_of_saved_image) + ".png")
                cv2.imwrite(saved_path, face*255)

                face = cv2.resize(face, (input_shape_y, input_shape_x))
                face = functions.normalize_input(img=face, normalization='ArcFace')
                images.append(face)
                num_of_saved_image +=1

            cv2.imshow("Video", frame)
            if cv2.waitKey(1) == ord('q'):
                break

        else:
            break

    cap.release()
    cv2.destroyAllWindows()

    if not images:
        print("cant detect anything")
    else:
        images = np.stack(images)
        embedding = model_recognition.predict(images)
        #median_embedding = np.median(embedding, axis=0)

        for idx, embed in enumerate(embedding):
            saved_embedding_path = os.path.join(\
                            embedding_folder, model_name + "_" + IDENTITY_NAME + "_" + str(idx)  + ".npy")
            np.save(saved_embedding_path, embed)

        # saved_embedding_path = os.path.join(embedding_folder, model_name + ".npy")
        # print(median_embedding.shape)
        # np.save(saved_embedding_path, median_embedding)

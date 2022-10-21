import cv2
from deepface import DeepFace
from deepface.detectors import FaceDetector
from deepface.commons import functions, distance as dst
import os
import numpy as np

from src.anti_spoof_predict import AntiSpoofPredict
from src.generate_patches import CropImage
from src.utility import parse_model_name

import pickle
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("./ceec-b2cd3-firebase-adminsdk-ksg3v-a70e7ab27c.json")
LockApp = firebase_admin.initialize_app(cred, {
	'databaseURL':'https://ceec-b2cd3-default-rtdb.asia-southeast1.firebasedatabase.app'
	})

ref = db.reference("/door")

# database_dir = r'./database_arcface'
# video_dir = r'rtmp://192.168.137.1/live/STREAM_NAME.flv'
# video_dir = r'/home/tung/Desktop/Face_recognition/video/test.mp4'

video_dir = '/dev/video1'
# video_dir = 0


model_name = 'ArcFace'
model_recognition = DeepFace.build_model(model_name)
input_shape_x, input_shape_y = functions.find_input_shape(model_recognition)

DATABASE = []

svm_model_dir = r'/home/tung/Desktop/Face_recognition/svm_model/svm_recognition_model.pkl'

with open(svm_model_dir, 'rb') as open_file:
        svm_classifier = pickle.load(open_file)

class_mapping = np.load(r'/home/tung/Desktop/Face_recognition/svm_model/class_mapping.npy')

model_test = AntiSpoofPredict('0')
h_input, w_input, model_type, scale = parse_model_name('2.7_80x80_MiniFASNetV2.pth')

model_test.init('/home/tung/Desktop/Face_recognition/Silent-Face-Anti-Spoofing/resources/anti_spoof_models/2.7_80x80_MiniFASNetV2.pth')

def verify(face_image, database, model, size):
    face_image = cv2.resize(face_image, size)
    face_image = functions.normalize_input(img=face_image, normalization='ArcFace')
    face_image = np.reshape(face_image, (1, face_image.shape[0], face_image.shape[1], 3))
    embedding = np.squeeze(model.predict(face_image))

    result = svm_classifier.predict_proba(np.reshape(embedding, (1, -1)))
    idx_result = np.argmax(result)
    # print(result)
    
    if result[0, idx_result] > 0.8:
        return class_mapping[idx_result]

    return "unknown"
    
import cv2, queue, threading, time

# bufferless VideoCapture
class VideoCapture:

  def __init__(self, name):
    self.cap = cv2.VideoCapture(name)
    self.q = queue.Queue()
    t = threading.Thread(target=self._reader)
    t.daemon = True
    t.start()

  # read frames as soon as they are available, keeping only most recent one
  def _reader(self):
    while True:
      ret, frame = self.cap.read()

      if not ret:
        self.q.put(False)
        break
      if not self.q.empty():
        try:
          self.q.get_nowait()   # discard previous (unprocessed) frame
        except queue.Empty:
          pass
      self.q.put(frame)

  def read(self):
    return self.q.get()



detector_backend = 'ssd'
face_detector = FaceDetector.build_model(detector_backend)

# cap = VideoCapture(video_dir)

cap = cv2.VideoCapture(video_dir)


acumulated_identity = ""
acumulated_detection = 0

while cap.isOpened():
    ret, frame = cap.read()
    # frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)

    # if type(frame) == type(True):
    #   print('exit')
    #   break
    try:
        if ret and frame is not None and len(frame) != 0:
            # frame = cv2.resize(frame, (640, 480))
            face, box = FaceDetector.detect_face(face_detector, detector_backend, frame, align=False)

            if face is not None and len(face) != 0:

                face_spoofing = cv2.resize(face, (w_input, h_input))
                prediction = model_test.predict(face_spoofing)
                label = np.argmax(prediction)

                # cv2.imshow("Face", face)

                frame = cv2.rectangle(frame, (box[0], box[1]), (box[2]+box[0], box[3]+box[1]), (255, 0, 255), 2)
                if label == 1 or label == 0:
                    face = np.true_divide(face, 255)
                    identity = verify(face, DATABASE, model_recognition, (input_shape_x, input_shape_y))
                    print("This is ", identity)
                    frame = cv2.putText(frame, identity, (box[0], box[1]), cv2.FONT_HERSHEY_PLAIN, 2, (255, 255, 0))

                    if identity != 'unknown':
                        if acumulated_identity == identity:
                            acumulated_detection += 1

                        else:
                            acumulated_identity = identity
                            acumulated_detection = 0

                        if acumulated_detection > 20:
                            ref.set("o")
                            print("Open Door")
                            acumulated_identity = identity
                            acumulated_detection = 0

                else:
                    frame = cv2.putText(frame, "Fake", (box[0], box[1]), cv2.FONT_HERSHEY_PLAIN, 2, (255, 255, 0))

            cv2.imshow("Video", frame)
        if cv2.waitKey(1) == ord('q'):
            break
    except:
        pass
cap.release()
cv2.destroyAllWindows()





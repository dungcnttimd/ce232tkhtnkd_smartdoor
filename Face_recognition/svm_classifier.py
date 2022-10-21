import os
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.pipeline import make_pipeline
import pickle


def data_generator(data_dir):
    data = {'embedding' : [], 'label' : []}
    class_mapping = [] 
    for idx, identity in enumerate(os.listdir(data_dir)):
        class_mapping.append(identity)
        embedding_folder = os.path.join(os.path.join(data_dir, identity), "embedding")
        for embedding_file in os.listdir(embedding_folder):
            embedding_file = np.load(os.path.join(embedding_folder, embedding_file))
            data['embedding'].append(embedding_file)
            data['label'].append(idx)

    return data, class_mapping

data, class_mapping = data_generator(r'/home/tung/Desktop/Face_recognition/database_arcface')

X = np.array(data['embedding'])
Y = np.array(data['label'])


X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=1, random_state=42)


clf = make_pipeline(SVC(gamma='scale', probability=True, verbose=True))
clf.fit(X_train, Y_train)

print("Score: ", clf.score(X_test, Y_test))
print("clf.classes_: ", clf.classes_)

file_name = r"/home/tung/Desktop/Face_recognition/svm_model/svm_recognition_model.pkl"

with open(file_name, "wb") as open_file:
    pickle.dump(clf, open_file)

np.save(r"/home/tung/Desktop/Face_recognition/svm_model/class_mapping.npy", np.array(class_mapping))
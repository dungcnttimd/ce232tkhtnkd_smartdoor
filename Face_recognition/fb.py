import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("./ceec-b2cd3-firebase-adminsdk-ksg3v-a70e7ab27c.json")
LockApp = firebase_admin.initialize_app(cred, {
	'databaseURL':'https://ceec-b2cd3-default-rtdb.asia-southeast1.firebasedatabase.app'
	})

ref = db.reference("/door")
ref.set("o")
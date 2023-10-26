import face_recognition
import os

def login(image_file):
    models_folder = 'models/'

    known_faces = {}
    for file_name in os.listdir(models_folder):
        if file_name.endswith('.png'):
            image_path = os.path.join(models_folder, file_name)
            image = face_recognition.load_image_file(image_path)
            face_encoding = face_recognition.face_encodings(image)[0]
            person_id, _ = os.path.splitext(file_name)
            known_faces[person_id] = face_encoding
    
    unknown_image = face_recognition.load_image_file(image_file)
    unknown_face_encoding = face_recognition.face_encodings(unknown_image)

    # Si no se encuentra ninguna cara en la imagen enviada
    if len(unknown_face_encoding) == 0:
        return None

    unknown_face_encoding = unknown_face_encoding[0]

    # Comparar con las caras conocidas
    found_id = None
    for person_id, face_encoding in known_faces.items():
        # Comparar las caras
        matches = face_recognition.compare_faces([face_encoding], unknown_face_encoding)
        if matches[0]:
            found_id = person_id
            break
    return found_id
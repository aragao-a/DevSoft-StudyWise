import requests
import pytest
import time
import sqlite3

BASE_URL = "http://localhost:5000"
TEST_USER = {
    "username": "testuser1",
    "password": "testpassword1",
    "email": "testuser1@example.com"
}
TEST_DB_PATH="Back-end/testDB.db"
quiz_id_global = None

@pytest.fixture(scope="module")
def auth_token():
    clean_db()
    requests.post(f"{BASE_URL}/register", json=TEST_USER)
    
    response = requests.post(f"{BASE_URL}/login", json={
        "email": TEST_USER["email"],
        "password": TEST_USER["password"]
    })
    data = response.json()  
    user_id = data.get("userResponse", {}).get("id")
    
    return user_id

def clean_db():
    # Limpa o banco antes e depois dos testes
    conn = sqlite3.connect(TEST_DB_PATH)
    conn.execute("DELETE FROM users")
    conn.execute("DELETE FROM quizzes")
    conn.execute("DELETE FROM labels")
    conn.commit()
    conn.close()

def test_register():
    clean_db()
    payload = {
        "username": "testuser2",
        "password": "testpassword2",
        "email": "testuser2@example.com"
    }
    response = requests.post(f"{BASE_URL}/register", json=payload)
    assert response.status_code == 201
    assert "user" in response.json()

def test_login(auth_token):
    assert auth_token is not None
    payload = {
        "email": TEST_USER["email"],
        "password": TEST_USER["password"],
    }
    response = requests.post(f"{BASE_URL}/login", json=payload)
    assert response.status_code == 200
    assert "userResponse" in response.json()

def test_create_quiz(auth_token):
    global quiz_id_global
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    payload = {"text": "Revolução Pernambucana", "userId": auth_token }
    response = requests.post(f"{BASE_URL}/text-quiz", json=payload, headers=headers)
    
    assert response.status_code == 200
    assert "quiz" in response.json()
    
    quiz_id_global =  response.json()["quiz"]["id"]

def test_get_quiz(auth_token):
    global quiz_id_global
    assert quiz_id_global is not None
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    response = requests.get(f"{BASE_URL}/target_questions/{auth_token}/{quiz_id_global}", headers=headers)
    assert response.status_code == 200
    assert len(response.json()["quizzes"]) > 0

def test_label_operations(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    payload = {
        "userId": auth_token,
        "label": "Test Label",
        "color": "#FFFFFF",
        "primaryLabelSet": "Miscelâneo"
    }
    response = requests.post(f"{BASE_URL}/create_label", json=payload, headers=headers)
    assert response.status_code == 201
    
    update_payload = {
        "newLabel": "Updated Label",
        "color": "#000000",
        "primaryLabelSet": "Miscelâneo"
    }
    response = requests.put(
        f"{BASE_URL}/update_label/{auth_token}/Test Label",
        json=update_payload,
        headers=headers
    )
    assert response.status_code == 200
    
    response = requests.get(f"{BASE_URL}/label_summary/{auth_token}", headers=headers)
    assert response.status_code == 200

def test_delete_quiz(auth_token):
    global quiz_id_global
    quiz_id = quiz_id_global
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    response = requests.delete(f"{BASE_URL}/delete_quiz/{auth_token}/{quiz_id}", headers=headers)
    assert response.status_code == 200

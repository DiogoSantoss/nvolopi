import requests
import multiprocessing
from os.path import join

URL = "http://35.205.26.159"
COUNT = 15
PATH = "./dummy-files/4mb"

"""
with open('report.xls', 'rb') as f:
    r = requests.post('http://httpbin.org/post', files={'report.xls': f})


https://requests.readthedocs.io/en/latest/user/quickstart/#post-a-multipart-encoded-file
"""

def auth(url, username, password):
  endpoint = join(url, "api/auth/auth")
  res = requests.post(endpoint, json={"username": username, "password": password})
  assert res.status_code // 100 == 2
  return res.text

def spam(session, url, path):
  endpoint = join(url, "api/upload/upload")
  res = session.post(endpoint, files = {"file": open(path, "rb")})
  assert res.status_code // 100 == 2 
  print(res.text)

if __name__ == "__main__":
  session = requests.session()
  token = auth(URL, "self@vaascoo.pt", "123")
  session.headers.update({"Authentication": f"Bearer {token}"})
  workers = []
  for _ in range(COUNT):
    print(f"spam(session = {session}, url = {URL}, path = {PATH})")
    workers.append(multiprocessing.Process(target=spam, args=(session, URL, PATH)))
    workers[-1].start()

  for worker in workers:
    worker.join()
import requests
import xml.etree.ElementTree as ET

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_drone(drone):
    num = drone.find("serialNumber").text
    x = drone.find("positionX").text
    y = drone.find("positionY").text
    return { "serialNumber": num, "x": x, "y": y }
    

@app.get("/")
def root():
    response = requests.get("http://assignments.reaktor.com/birdnest/drones")
    capture = ET.fromstring(response.text).find("capture")
    result = [ parse_drone(drone) for drone in capture ]
    return result

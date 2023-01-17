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


ndz_violate_drones = {}


def parse_drone(drone):
    serial = drone.find("serialNumber").text
    x = drone.find("positionX").text
    y = drone.find("positionY").text
    return { "serial": serial, "x": x, "y": y }


def fetch_drones():
    response = requests.get("http://assignments.reaktor.com/birdnest/drones")
    capture = ET.fromstring(response.text).find("capture")
    return [ parse_drone(drone) for drone in capture ]
    

def is_violate(drone):
    threshold_squared = 100000**2
    x = float(drone["x"])
    y = float(drone["y"])
    dx_squared = (x - 250000)**2
    dy_squared = (y - 250000)**2
    return dx_squared + dy_squared < threshold_squared


@app.get("/")
def root():
    return fetch_drones()


@app.get("/ndz")
def ndz():
    drones = fetch_drones()
    drones = {
        drone["serial"]: drone
        for drone in drones
        if is_violate(drone)
    }
    ndz_violate_drones.update(drones)
    return list(ndz_violate_drones.values())

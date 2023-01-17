import requests
import xml.etree.ElementTree as ET
import json
from math import sqrt

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
    x = float(drone.find("positionX").text)
    y = float(drone.find("positionY").text)
    return {
        "serial": serial,
        "x": x,
        "y": y,
        "distance": distance_meters(x, y),
    }


def fetch_drones():
    response = requests.get("http://assignments.reaktor.com/birdnest/drones")
    capture = ET.fromstring(response.text).find("capture")
    return [ parse_drone(drone) for drone in capture ]


def fetch_pilot(serial):
    response = requests.get(f"http://assignments.reaktor.com/birdnest/pilots/{serial}")
    data = json.loads(response.text)
    fields = [ "firstName", "lastName", "email", "phoneNumber" ]
    return { field: data[field] for field in fields }
    

def distance_meters(x, y):
    dx_squared = (x - 250000)**2
    dy_squared = (y - 250000)**2
    return sqrt(dx_squared + dy_squared) / 1000


@app.get("/")
def root():
    return fetch_drones()


@app.get("/ndz")
def ndz():
    drones = fetch_drones()
    violate_drones = {
        drone["serial"]: drone
        for drone in drones
        if drone["distance"] < 100
    }

    for serial, drone in violate_drones.items():
        if serial not in ndz_violate_drones:
            drone.update(fetch_pilot(serial))
            ndz_violate_drones[serial] = drone
        elif drone["distance"] < ndz_violate_drones[serial]["distance"]:
            ndz_violate_drones[serial]["distance"] = drone["distance"]

    return list(ndz_violate_drones.values())

# Imports
import os
import cv2
import imutils
import random
import numpy as np
from skimage import transform as tf
from skimage.util import random_noise

# Read images
originalImages = os.listdir("./images")

# Rotate images by 15
for originalImage in originalImages:
  image = cv2.imread(f"./images/{originalImage}")
  randomAngle = random.randint(10, 20)
  rotated = imutils.rotate(image, angle=randomAngle)
  cv2.imwrite(f'./converted/rotated_by_15_{originalImage}', rotated) 

# Rotate images by -15
for originalImage in originalImages:
  image = cv2.imread(f"./images/{originalImage}")
  randomAngle = random.randint(10, 20)
  rotated = imutils.rotate(image, angle=-randomAngle)
  cv2.imwrite(f'./converted/rotated_by_-15_{originalImage}', rotated) 

# Rotate images horizontally
for originalImage in originalImages:
  image = cv2.imread(f"./images/{originalImage}")
  flipped = cv2.flip(image, 1)
  cv2.imwrite(f'./converted/flipped_{originalImage}', flipped) 

# Add noise to image
for originalImage in originalImages:
  image = cv2.imread(f"./images/{originalImage}")
  noised_image = random_noise(image, mode='s&p',amount=0.1)
  noised_image = np.array(255*noised_image, dtype = 'uint8')
  cv2.imwrite(f'./converted/noised_{originalImage}', noised_image) 

# Blur image
for originalImage in originalImages:
  image = cv2.imread(f"./images/{originalImage}")
  blured = cv2.blur(image,(5,5))
  cv2.imwrite(f'./converted/blured_{originalImage}', blured) 

# Affin transformation
pts1 = np.float32([[50, 50], 
                  [200, 50],  
                  [50, 200]]) 
  
pts2 = np.float32([[10, 100], 
                  [200, 50],  
                  [100, 250]]) 
M = cv2.getAffineTransform(pts1, pts2) 

for originalImage in originalImages:
  image = cv2.imread(f"./images/{originalImage}")
  rows, cols, ch = image.shape 
  transformed = cv2.warpAffine(image, M, (cols, rows)) 
  cv2.imwrite(f'./converted/affin_{originalImage}', transformed) 

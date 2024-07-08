# ROOKIE GENERATOR - TIKTOK TECHJAM 2024

---

## ROOKIE Team Introduction

- Le My Khanh Quynh ([lmkq](https://github.com/lmkq))
- Do Nguyen An ([4d4mworth1844](https://github.com/4d4mworth1844))
- Le Van Tien Dat ([levantiendat](https://github.com/levantiendat))
- Trinh Long Vu ([TrinhLongVu](https://github.com/TrinhLongVu))
- Cao Nguyen Khanh ([caokhanh2k3](https://github.com/caokhanh2k3))

---

### PRODUCT FEATURES
This platform aims to support users in creating videos with a user-friendly homepage interface, including options for uploading videos, generating audio from text, and creating images. Using TikTok videos as data, the platform provides several key features:
#### 1. Audio Generation
- Convert scripts into audio with various voice options, including user-uploaded voices and different languages (e.g., English, Vietnamese, Korean...).
#### 2. AI-driven Trending Hashtag Recommendations: 
- Suggest trending hashtags based on video content analysis.

---

> Check out our demonstration here:

[![](https://markdown-videos-api.jorgenkh.no/youtube/HFKwWb8UNxI)](https://youtu.be/HFKwWb8UNxI)

---

### Usage flow

---
![flow.drawio](https://hackmd.io/_uploads/SkyCkKOwA.png)
---

### Architecture of models

---
- AI Voice Over : Text-to-speech conversion

![aitext](https://hackmd.io/_uploads/Bk2MlFdPC.png)

- AI-driven trending hashtag suggestions

![ai_hashtag](https://hackmd.io/_uploads/HkWYgF_vA.png)

---
## Data sources

- Our product is built using simulated data from music tracks and trending hashtags on TikTok.

---

### HOW TO RUN WEBSITE

---

#### Implement API using Nodejs and Python Flask App and UI using ReactJS
---
- Clone the repository

```git
git clone https://github.com/levantiendat/Rookie.git
```
---
- Run services
```python=
cd AI
python app.py
```
```javascript=
cd backend
node server.js
```
---
- Run ReactJs UI
```javascript=
npm i
cd frontend
npm start
```
---


### Wrap up

This project represents a significant step towards enhancing the functionality and user experience in hashtag generation and content merging within a ReactJS environment. With the successful implementation of features such as video and audio uploads, API integration for hashtag recommendations, and efficient content processing, we have created a robust platform for users to manage and optimize their digital content seamlessly.

Key accomplishments include:

- Hashtag Recommendation System: Leveraging AI to provide users with relevant and frequent hashtag suggestions.
- Content Upload and Merging: Enabling users to upload multiple audio files, merge them with video content, and handle the processing directly from the homepage.
- Seamless User Interface: Designing intuitive components and modals using CSS, ensuring a smooth and user-friendly experience.
Moving forward, further enhancements could include:

- Advanced Analytics: Integrating analytics to track the performance of recommended hashtags.
- Enhanced AI Models: Continuously improving the AI models to provide more accurate and context-aware suggestions.
- Expanded Content Types: Supporting additional types of content and metadata for a broader range of use cases.
#### We hope this project serves as a valuable tool for anyone looking to streamline their content creation process and improve their social media engagement through intelligent hashtag recommendations. Thank you for using our platform!

---

### Thank you!

You can contact us on

- GitHub: https://github.com/levantiendat/Rookie
- Email : khanhquyng0111@gmail.com

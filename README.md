<a name="readme-top"></a>

<div align="center">
  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555)](https://www.linkedin.com/in/alina-fedoriv-89868720b/)

<br />
<a href="https://alinafedoriv-create-map.netlify.app/" target="_blank">
    <img src="src/img/icons/icon-orange.png" alt="Logo" width="35" height="80">
</a>

<br />
<h3 align="center">Create. Map.</h3>

<br />
<p align="center">
    The <strong>Create. Map.</strong> App is a web application that allows the users to log their most and least favorite places, and spots they want to remember or plan to visit by marking the locations on an interactive map.
  
  <br />
  <br />
  Explore the live demo or watch the video demo below.
<br />
<br />
<a href="https://alinafedoriv-create-map.netlify.app/" target="_blank">View Live Demo</a>
</p>
</div>

<br />
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

<br />

[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=7394b4&lines=Create.+Map.)](https://git.io/typing-svg)

https://github.com/afedoriv/create-map/assets/99702784/6d7af300-06f4-49b1-b261-e76ce31dac62

<br />
<details>
  <summary>Application Screenshots</summary>

<br />
<div align="center">
  <img src="https://github.com/afedoriv/create-map/assets/99702784/18b0d24d-568f-45bb-81c3-8f18811a7d6a" width="100%"/>
</div>
</details>

<br />

### Introduction

Create. Map. is a web application that allows the users to log their most and least favorite places, and spots they want to remember or plan to visit by marking the locations on an interactive map. 

This application was created with simplicity, usability, and user-friendly design in mind. 

Create. Map. uses the mobile-friendly map provided by the Leaflet library and the OpenStreetMap data. The user’s position is automatically obtained using geolocation API. The BigDataCloud’s reverse geocoding API transforms the coordinates into precise locations. 
 
The application users can select a category, assign a color, and add a comment to each marked location. Every marker is labeled and has a descriptive ‘alt’ attribute and a title to ensure the map’s usability to persons of a wide range of abilities.

The markers are grouped into layers according to the marker color to allow users to easily switch different layers on the map. The users can adjust a zoom level and select a map tile.

In addition, the Create. Map. users can keep a log of all marked locations and see the list at a glance on the sidebar. They can also see all marked places on the map and move the map to a select spot by clicking on the corresponding list item. 

All the data about marked locations is stored in the browser using local storage API and can be deleted by the user. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript">
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white" alt="Leaflet">  
  <img src="https://img.shields.io/badge/green%20sock-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GreenSock Animation Platform">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma">
</div> 
  
<br />
<br />

- [JavaScript](https://www.javascript.com/) - A powerful scripting language for web development.
- [Leaflet](https://leafletjs.com/) - A leading open-source JavaScript library for interactive maps.
- [GSAP](https://greensock.com/gsap/) - GreenSock Animation Platform for smooth animations.
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - The standard markup language for creating web pages and web applications.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Cascading Style Sheets for styling web pages.
- [Figma](https://www.figma.com/) - A collaborative interface design tool used to create custom markers and icons for the map.
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Key Features

- **Interactive Mapping**: Mark and categorize locations effortlessly on an interactive map.
- **Color-Coded Categories**: Assign distinct colors (Blue, Pink, Yellow) for quick identification of different location types.
- **Commenting**: Add comments to each marked location, providing additional context and details.
- **Responsive Design**: Enjoy a seamless experience on various devices with the responsive design.
- **Geolocation Support**: The application starts at your location, ensuring a personalized and relevant starting point.
- **Persistent Storage**: Utilizes local storage for seamless data persistence between sessions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

Get started with the **Create. Map.** App by following these steps to set up and run the project locally:

<br />

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/afedoriv/create-map.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd create-map
    ```

3. **Open in Browser:**

    Open the **`index.html`** file in your preferred web browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

<ol>
  <li>Open the App in your preferred web browser.</li>
  <li>Allow the application to access your location when prompted.</li>
  <li>Start marking your favorite locations on the map by following the on-screen instructions.</li>
</ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

- **Leaflet:** The pivotal mapping library that forms the backbone of the application and underpins the interactive features of **Create. Map.**
- **OpenStreetMap:** The collaborative platform supplying essential geospatial data for accurate location representation.
- **BigDataCloud:** Facilitating precise location translation through their reverse geocoding API.
- **MapTiler:** The provider of map tiles, contributing to the visually appealing and dynamic map experience within **Create. Map.**
- **Netlify:** Enabling seamless deployment and hosting, ensuring global accessibility and reliability.
- **New York Font by Artem Nevsky:** Enhancing the visual aesthetics of Create. Map. with a distinctive and stylish font.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Alina Fedoriv - fedoriv2023@gmail.com

Project Link - [https://github.com/afedoriv/create-map.git](https://github.com/afedoriv/create-map.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

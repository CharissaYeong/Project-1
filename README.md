<br>

<div align="center">
  <a href="https://charissayeong.github.io/Project-1/Project%201/Project/index.html">
    <img src="Project%201/imgs/Logo.png" alt="Logo" width="100%">
  </a>
</div>

<br><br>

# Demo

The live demo can be accessed via the link below:

[https://charissayeong.github.io/Project-1/Project%201/Project/index.html](https://charissayeong.github.io/Project-1/Project%201/Project/index.html)

<br>

# Introduction

## Overview

<div align="justify">
Dengue fever is a viral disease caused by the dengue virus, which is transmitted to humans through the bite of infected Aedes mosquitoes. It is a significant public health concern in many parts of the world, particularly in tropical and subtropical regions like Singapore.

The virus has four distinct serotypes, known as DENV_1, DENV_2, DENV_3, and DENV_4. These serotypes are genetically related but differ in their antigenic properties, meaning they can stimulate the production of specific antibodies in the immune system. 

Dengue fever typically begin 3-14 days after infection and can last for up to 10 days. Symptoms include a sudden onset of fever, severe headache, muscle and joint pain, fatigue, nausea, vomiting, skin rash, and mild bleeding (such as nose or gum bleeding). In severe cases, dengue fever can progress to dengue hemorrhagic fever (DHF) or dengue shock syndrome (DSS), which can be life-threatening.

<br>

## Rationale 

This data visualization project aims to showcase the Dengue fever statistics in Singapore in an easy to read and interactive dashboard format. Currently dengue statistics made available to the public are scattered across multiple formats (PDFs, APIs etc). By extracting and combining all the relavent data from these sources, anyone interested in the Dengue epidemic can easily monitor all the relevant statistics in a single page. Being able to view these datasets together will also allow user to observe possible trends or patterns.

<br>

## Key Data Points
<br>

|No.| Data | Description |
|:---|:----------|:-------|
|1.| Dengue Fever | Number of dengue cases reported. |
|2.| Dengue Haemorrhagic Fever (DHF/Dengue HF) | Number of DHF cases reported. A more severe form of dengue.|
|3.| DENV_1, DENV_2, DENV_3, DENV_4 | Serotype groups of the dengue virus based on distinct variations of the antigens or other molecules found on its surface.|
|4.| Deaths  | Number of dengue related deaths reported. |
|5.| Active Clusters   | Number of active dengue clusters. A cluster is active if there are new nfections reported in the same area within a period of time. |
|6.| Breeding Habitats | Aedes mosquito breeding sites found by NEA in homes and public areas.|
|7.| Rainy Days | Number of rainy days recorded at the Changi Climate Station. |
|8.| Epi-week (Epidemiological Week) | A standardized method of counting weeks to allow for the comparison of data across the years. Each year is typically seperated into 1-52 or 1-53 Epi-weeks.

<br><br>

# Screenshots

<div align="center">
  <a href="https://charissayeong.github.io/Project-1/Project%201/Project/index.html">
    <img src="Project%201/imgs/mockup.png" alt="mockup" width="100%">
  </a>
</div>

<br><br>

# Tests


|No.| Test Case | Result |
|:--|:----------|:-------|
|1.| Verify data accuracy | Data processing was performed correctly. Data displayed in charts matches the source data. |
|2.| Test chart interactivity   | Charts are interactive, users can hover/click over data points to view all necessary information in the tootips. |
|3.| Test filter functionality  | User can choose to view data by years or quarters by selecting the appropriate filters. Calculations to obtain filtered data are accurate. |
|4.| Check for responsiveness   | Charts are responsive and adjust to different screen sizes. |
|5.| Evaluate page usability | All elements in page load correctly and navigation links are working.|

<br><br>

# Built With

DengueWatch 2023 is built with the following tools and libraries:

* JavaScript
* Bootstrap
* HTML/CSS
* ApexCharts

<br>

# Data Sources

Data sourced from National Environmental Agency (NEA) and Data.gov.sg

* [Dengue Cases Page](https://www.nea.gov.sg/dengue-zika/dengue/dengue-cases)
* [Quarterly Surveillance Data](https://www.nea.gov.sg/dengue-zika/dengue/quarterly-dengue-surveillance-data)
* [Weekly Infectious Disease Bulletin](https://data.gov.sg/dataset/weekly-infectious-disease-bulletin-cases)
* [Rainfall - Monthly Number of Rain Days](https://data.gov.sg/dataset/rainfall-monthly-number-of-rain-days)

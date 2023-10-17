# Uncountable Coding Assignment

## Data Visualization Site (DataVizHub)

## Summary

This project allows users to visualize a dataset through scatterplots and histograms. The first view the user has access to is they can choose an input and an output to compare on a scatterplot. The second view is a histogram through which a user can choose an output, a range for the measurement of the chosen output, and finally the inputs that they are interested in seeing the average measurements of that produced the specified range of outputs. The goal of DataVizHub is to allow users to visualize the relationships between inputs and outputs in the experiment as well as see the conditions in which a certain output was produced in experiments.

## Architecture

The project utilizes ReactJS for the frontend and ChartJS and react-chartjs-2 as the libraries to produce charts. The React app has two screens: scatter and histogram. In each screen, the user’s chosen inputs, outputs, and range are stored as states. When all required inputs are selected, the data json object is then queried to find corresponding data to provide to the ChartJS chart. For the histogram, whenever the user edits minimum and maximums the dataset is queried to see if it is within the range of measurements for the selected output. 

Other libraries used:

- Create-React-App library was used to bootstrap the project
- React-select for dropdowns
- Font-Awesome Icons for logo

## How to Improve

In a production setting, here are several things I would improve and add:

- Add ability for user to view multiple datasets on one chart.
- Implement a backend database that stores the data so the data is not hard-coded into the project/easier to add more data to it.
- Add ability for user to save the created chart.
- Have a home page explaining how to use the platform more extensively.

## How to Run
- Run `npm install`
- Run `npm run start`
- Visit [localhost://3000](http://localhost3000/) to view DataVizHub.

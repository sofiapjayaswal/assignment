# Uncountable Coding Assignment

## [Data Visualization Site (DataVizHub)]([url](https://datavizhub.onrender.com/))

## Summary

This project allows users to gain insights from a provided dataset by presenting it through dynamic scatterplots and histograms.

In the initial view, users can select both an input and an output parameter to effectively compare and analyze their data on a scatterplot. This intuitive interface provides a quick and straightforward way to explore relationships within the dataset.

For more in-depth examination, the project also offers a second view, which features dynamic histograms. Within this view, users can select a specific output variable, define a custom measurement range for that output, and then specify the input parameters they are interested in. This allows users to visualize the average measurements of inputs that resulted in the specified range of outputs.

Overall, the project provides a powerful tool for uncovering patterns, trends, and conditions under which specific outputs are generated in various experiments.

## Architecture

The project utilizes ReactJS for the frontend and ChartJS, along with react-chartjs-2, for chart rendering. The React app consists of two screens: one for scatterplots and another for histograms. The screens are located in the *link directory.* User-selected inputs, outputs, and range values are tracked as states. When all necessary inputs are selected, the app queries the data JSON object to fetch corresponding data for rendering the ChartJS chart. For histograms, user-edited minimum and maximum values trigger dataset queries to ensure they fall within the selected output's measurement range. 

Additional libraries include Create-React-App for project bootstrapping, React-select for dropdowns, and Font-Awesome Icons for a logo.

## How to Improve

In a production setting, here are several things I would improve and add:

- Add ability for user to view multiple datasets on one chart.
- Implement a backend database that stores the data so the data is not hard-coded into the project/easier to add more data to it.
- Add ability for user to save the created chart.
- Have a home page explaining how to use the platform more extensively.
- Add a linear regression to the scatterplot to help users visualize the correlation.
- If the dataset were larger, it would be inefficient to update data for the chart everytime the user changed one of the required specifications. Therefore, I would implement a form, so the user would have to submit specifications before the dataset is queried to provide data for the chart.

Link to hosted site: https://datavizhub.onrender.com/

## How to Run Locally
- Run `npm install`
- Run `npm run start`
- Visit [localhost://3000](http://localhost3000/) to view DataVizHub.

# Overview

The general idea of this tool is to translate abstract design decisions in the form a data interchange format like `json` and output them into consumable files for any platform.

The typical process is:

1. Input flat theme data
2. (optional) Structure data so it's suitable for templates
3. Render output using template and data (can be specified in plugin or global config)
4. Write output to files (can be specified in plugin or global config)

Depending on the use of the tool, the author can choose how to structure the theme data (if at all) and they can choose what templates will be used to render the data. In some instances they may want to add template outputs that contain no data.

At the point at which data is structured this is where I had imagined that the author would also transform the data for use with the template. For example if there is a certain sentence case which a platform uses, the data would be processed for each platform and then rendered into the template for that platform, so the correct sentence case is used for each platform. This could also be done at a template level however you should be careful what is added to a global template that may not be reusable by every plugin.

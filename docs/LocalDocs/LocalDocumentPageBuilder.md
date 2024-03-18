# Page Builder

## Introduction

The page builder package was created to place various elements known as widgets, it gives the programmer the ability to create micro-components of the page in different modes in a shorter period of time and without human error. place next to each other in a responsive manner.
One of the advantages of page builder in the project is to create an interface to implement micro-components in widget format in a completely uniform and similar way.
Each widget can have an editing panel (option panel), so that the display and functionality of the widget can be flexible.

## Usage
In the project q-page-builder component defined globally. The reason for defining this component globally is to force this component to be used on all pages. In this component, four main props are very widely used.

```html
<q-page-builder v-model:sections="currenSections"
               v-model:options="pageConfig"
               :editable="pageBuilderEditable"
               :loading="pageBuilderLoading" />
```
The type of  **Section** prop is an array and its general structure is as follows.
```javascript
sections: [
 {
   options: { /* Section Options */ },
   data: {
     rows: [
       {
         options: { /* Row Options */ },
         cols: [
           {
             options: { /* Column Options */ },
             widgets: [
               {
                 name: 'WidgetName',
                 options: { /* Widget Options */ }
               }
             ]
           }
         ]
       }
     ]
   }
 }
]
```

Each member of this array is called a section, which contains two keys, data and options. In the options key, you can set the settings for each section, and in the data key, you can specify the information about the rows.
Each row contains two keys, cols and options. In the options key, you can set the settings for each row, and in the cols key, you can specify the information about the columns or the so-called cols.
Each col contains two widgets and options keys. In the options key, you can set the settings for each col, and in the widgets key, you can specify an array of widgets.
Each widget contains two keys: name and options. In the options key, you can set the settings for each widget, and in the name key, you can specify the name of the desired widget to be loaded on the page.

> **Note:** It is possible to define a widget by writing section in its name key. In this way, we can load a section as a widget inside another section and have a nested structure.

> **Note:** a script is written in the boot of the project, which checks the path defined for widgets (src/components/Widgets) when building or even developing the project, and according to the specific structure defined for widgets, widgets are automatically added. It recognizes the defined ones with the corresponding categories and defines them in the project as definAsync. In this way, on every page, only when the name of a widget is mentioned, the bundle of that widget is also loaded on the page, and the user does not realize the weight of the volume of all widgets on all pages.

> **Note:** In the definition of widgets, care should be taken that in the defined path of the widgets (src/components/Widgets) of the system, a folder containing a vue file is located directly inside it, and the name of the folder and the vue file are exactly the same. The face of a widget looks.

Explanation of the structure of sections
There is no need to manually implement sections. The page builder package has an editing mode, which is controlled by a prop named editable. If you move the page builder component to edit mode using this prop, the package will provide the user with a different view of the page structure so that he can use that view to arrange the sections structure with a panel graphically.
Therefore, the details related to the options key for each of the section, row, col or widget concepts, which include many items, can be seen in the option panel for each widget.
In the package, it is possible to create an option panel for each widget that is registered in the project. In this way, if there is a file called Option Panel.vue next to the vue file, which has the same name as its folder, then the widget considers this component as a panel to edit the corresponding widget's performance.
In the structure of the package, a general arrangement is seen in the form of tab pages for option panels row, col, and section, and the specific details of each of these items are placed on the main page tab, and other tab pages such as the general items of typography, or spacing, or background and or border or hover effects or... are placed in the tabs of other pages.
This structure is implemented in such a way that this structure can be used for other widgets that are arbitrarily defined inside the project.

> **Note:** In the structure of widgets, it is possible to use a widget inside another widget. Let's say we have a simple widget called text widget, which has many features in its editing panel, including a complete editor to change the text of the widget, as well as many features to change the appearance of the text, such as the font size in different page sizes (responsive). We have another widget to display user comments with a special layout called comment widget, which is supposed to display the comments of offending users. Now suppose you want to design an editing panel for the comment widget to record different comments. The noteworthy point is that you can use the text widget to display the text of the comment widget, and you can also use the text widget editing panel, which has already been defined with all the details for the comment widget editing panel. Therefore, the operator will be able to make all kinds of changes on each of the different text parts of the comment widget. For example, change the text of the commenter's name and the comment text completely separately and give different settings to these two for different page sizes (responsive).

It is possible to create this page on a different key page using the Route name, and from that key, using an api, the data related to sections can be obtained from the database or even changed.
In this way, we have given special operators the possibility to instantly change the general and layout of all the pages as well as the details of the pages.

In the graphical view of the page builder package, the user has tried to make as many changes as possible on all the details of the page with the greatest ease, and according to this goal, facilities such as drag and drop have been given to the operator to move the widgets.

Another advantage of widgets is to isolate the programmer to a single widget, in such a way that the possible mistake of the programmer only disturbs the same widget and other parts of the project are not disturbed.

An interface has been created in the structure of widgets, by implementing it, programmers can benefit from the server side request feature without getting involved with the complexities of the SSR discussion. For more details on this matter, refer to the ssr prefetch section.

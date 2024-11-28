

    // Example usage:
    let xmlString = `
    <book bork="fru" title="JavaScript Essentials">
        <author>John Doe</author>
        <chapter number="1">
            <title>Introduction to JavaScript</title>
            <content>Content goes here...</content>
        </chapter>
        <chapter number="2">
            <title>Advanced JavaScript</title>
            <content>Content for advanced topics...</content>
        </chapter>
    </book>`;

    // xmlString = `
    // <book bork="fru" title="JavaScript Essentials">
    //   <book bork="fru2" title="2JavaScript Essentials">

    //   </book>
    // </book>`;
    // xmlString = `
    //   <chapter number="1">
    //       <title>Introduction to JavaScript</title>
    //       <content>Content goes here...</content>
    //   </chapter>
    //   <chapter number="2">
    //       <title>Advanced JavaScript</title>
    //       <content>Content for advanced topics...</content>
    //   </chapter>
    // `;


    // xmlString = `
    // <book bork="fru" title="JavaScript Essentials">
    // d
    //   <a></a>
    //   x
    //   <b></b>
    // </book> x`;

    // xmlString = `
    //   <?xml version="1.0" encoding="UTF-8"?>
    //   <bork/>
    //   <workflow>
    //       <task name="start">
    //           <type>start</type>
    //           <next>task1</next>
    //       </task>

    //       <task name="task1">
    //           <type>process</type>
    //           <next>task2</next>
    //           <action>ValidateInput</action>
    //           <parent>start</parent>
    //       </task>

    //       <task name="task2">
    //           <type>process</type>
    //           <next>end</next>
    //           <action>ProcessData</action>
    //           <parent>task1</parent>
    //       </task>

    //       <task name="end">
    //           <type>end</type>
    //           <parent>task2</parent>
    //       </task>
    //   </workflow>
    //   `;



    xmlString = `<note>
        <to attr="value">John</to>
        <from>Jane</from>
        <heading>Reminder</heading>
        <body>Don't forget the meeting!</body>
        <selfClosing tag="example" />
    </note>`;

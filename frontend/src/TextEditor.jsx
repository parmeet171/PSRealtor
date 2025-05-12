import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = () => {
  const [editorData, setEditorData] = useState("");

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">CKEditor Integration</h2>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={{
          licenseKey: "", // Leave empty for the free version
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
      />
      <div className="mt-4 p-2 border rounded">
        <h3 className="text-lg font-semibold ">Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorData }}></div>
      </div>
    </div>
  );
};

export default TextEditor;
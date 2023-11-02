import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Dispatch, FC, SetStateAction, useRef } from "react";

interface Props {
  initialValue?: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const TextEditor: FC<Props> = ({
  initialValue = "",
  setContent,
}): JSX.Element => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TEXT_EDITOR_KEY}
        init={{
          plugins:
            "tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
        }}
        onInit={(evt, editor) => {
          if (editorRef) editorRef.current = editor;
        }}
        initialValue={initialValue}
        onChange={() => {
          if (editorRef.current?.getContent())
            setContent(editorRef.current?.getContent());
        }}
      />
    </>
  );
};

export default TextEditor;

import { Dispatch, FC, SetStateAction, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
interface Props {
  initialValue?: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const SmallTextEditor: FC<Props> = ({
  initialValue = "",
  setContent,
}): JSX.Element => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      apiKey={process.env.REACT_APP_TEXT_EDITOR_KEY}
      initialValue={initialValue}
      init={{ menubar: false }}
      onInit={(evt, editor) => {
        if (editorRef) editorRef.current = editor;
      }}
      onChange={() => {
        if (editorRef.current?.getContent())
          setContent(editorRef.current?.getContent());
      }}
    />
  );
};

export default SmallTextEditor;

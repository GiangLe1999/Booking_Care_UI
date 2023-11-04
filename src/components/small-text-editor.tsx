import { Dispatch, FC, SetStateAction, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
interface Props {
  initialValue?: string;
  setContent: Dispatch<SetStateAction<string>>;
  value: string;
}

const SmallTextEditor: FC<Props> = ({ setContent, value }): JSX.Element => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      apiKey={process.env.REACT_APP_TEXT_EDITOR_KEY}
      init={{ menubar: false }}
      onInit={(evt, editor) => {
        if (editorRef) editorRef.current = editor;
      }}
      onEditorChange={() => {
        if (editorRef.current?.getContent())
          setContent(editorRef.current?.getContent());
      }}
      value={value}
    />
  );
};

export default SmallTextEditor;

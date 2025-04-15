import { useCallback, useEffect, useState } from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';
import 'katex/dist/katex.min.css';
import 'easydrawer/styles.css';

import { useTheme } from '../ThemeContext';
import extensions from './extensions';
import { DEFAULT, debounce } from './constants';

function RichEditor() {
  const [content, setContent] = useState(DEFAULT);
  const [disable, setDisable] = useState(false);
  const [editorTheme, setEditorTheme] = useState('');

  const { theme } = useTheme();

  useEffect(() => {
    setEditorTheme(theme === 'nord' ? 'light' : 'dark');
  }, [theme]);

  const onValueChange = useCallback(
    debounce((value: string) => setContent(value), 300),
    []
  );

  return (
    <div className="p-[24px] flex flex-col w-full max-w-screen-lg gap-[24px] mx-auto my-0" style={{ maxWidth: 1024, margin: '40px auto' }}>
      <div style={{ display: 'flex', gap: '12px', marginTop: '100px', marginBottom: 10 }}>
        <button type="button" onClick={() => setDisable(!disable)}>
          {disable ? 'Editable' : 'Readonly'}
        </button>
      </div>

      <RichTextEditor
        output="html"
        content={content}
        onChangeContent={onValueChange}
        extensions={extensions}
        dark={editorTheme === 'dark'}
        disabled={disable}
      />

      {typeof content === 'string' && (
        <textarea
          style={{ marginTop: 20, height: 500 }}
          readOnly
          value={content}
        />
      )}
    </div>
  );
}

export default RichEditor;
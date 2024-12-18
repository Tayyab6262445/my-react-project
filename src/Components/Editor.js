import React, { useEffect, useRef, useState } from 'react';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/htmlmixed/htmlmixed'; // HTML, CSS, and JS mode
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Pages/Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [previewContent, setPreviewContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: 'htmlmixed',
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });

      socketRef.current.on(ACTIONS.PREVIEW, ({ code }) => {
        setPreviewContent(code);
        setShowPreview(true);
      });

      return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
        socketRef.current.off(ACTIONS.PREVIEW);
      };
    }
  }, [socketRef.current]);

  const saveDocument = () => {
    const code = editorRef.current.getValue();
    const blob = new Blob([code], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'document.html';
    a.click();
  };

  const previewDocument = () => {
    const code = editorRef.current.getValue();
    setPreviewContent(code);
    setShowPreview(true);
    socketRef.current.emit(ACTIONS.PREVIEW, { roomId, code });
  };

  const closePreview = () => setShowPreview(false);

  return (
    <>
      <textarea id="realtimeEditor" />
      <div className="editor-actions flex justify-end space-x-10 items-center bg-[#282A36] pr-10 ">
        <div className='text-white' ><button onClick={previewDocument}>Preview</button></div>
        <div className='text-white'><button onClick={saveDocument}>Save as HTML</button></div>
      </div>
      {showPreview && (
        <div className="preview-overlay">
          <div className="preview-content">
            <button className="close-button" onClick={closePreview}>
              ×
            </button>
            <iframe srcDoc={previewContent} frameBorder="0" className="preview-frame"></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;

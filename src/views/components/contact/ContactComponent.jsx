import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MessageCardComponent from './MessageCardComponent';
import StatusBarComponent from '../StatusBarComponent';

import { getContent } from '../../../controllers/contentSlice';
import { setMessage, setMessageType } from '../../../controllers/messageSlice';

function ContactComponent() {
  const dispatch = useDispatch();

  const {
    contentLoading,
    contentErrorMessage,
    content,
  } = useSelector((state) => state.content);
  const { contactErrorMessage, contactSuccessMessage } =
    useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getContent('contact'));
  }, [dispatch]);

  useEffect(() => {
    if (contentErrorMessage) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(contentErrorMessage));
    }
  }, [contentErrorMessage]);

  useEffect(() => {
    if (contactSuccessMessage) {
      dispatch(setMessageType('success'));
      dispatch(setMessage(contactSuccessMessage));

      setTimeout(() => {
        window.location.href = `/`;
      }, 3000);
    }
  }, [contactSuccessMessage]);

  useEffect(() => {
    if (contactErrorMessage) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(contactErrorMessage));
    }
  }, [contactErrorMessage]);

  useEffect(() => {
    if (content.message) {
      dispatch(setMessage(content.message));
    }
  }, [content]);

  return (
    <main>
      {content.title && <h2 className="title">{content.title}</h2>}

      <div className="contact-card card">
        <MessageCardComponent page={'/contact'} />
      </div>

      <StatusBarComponent />
    </main>
  );
}

export default ContactComponent;

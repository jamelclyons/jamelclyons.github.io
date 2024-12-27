import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MessageCardComponent from './MessageCardComponent';
import StatusBarComponent from '../StatusBarComponent';

import { ContactPage, getContactPageContent } from '../../../controllers/contactSlice';
import { setMessage, setMessageType } from '../../../controllers/messageSlice';

import User from '../../../model/User';

import type { AppDispatch, RootState } from '../../../model/store';

interface ContactProps {
  user: User;
}

const ContactComponent: React.FC<ContactProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { contactErrorMessage, contactSuccessMessage, contactPage } =
    useSelector((state: RootState) => state.contact);

  useEffect(() => {
    dispatch(getContactPageContent());
  }, [dispatch]);

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
    if (contactPage?.message) {
      dispatch(setMessage(contactPage.message));
    }
  }, [contactPage]);

  return (
    <main>
      {contactPage?.title && <h2 className="title">{contactPage.title}</h2>}

      <div className="contact-card card">
        <MessageCardComponent page={'/contact'} />
      </div>

      <StatusBarComponent />
    </main>
  );
}

export default ContactComponent;

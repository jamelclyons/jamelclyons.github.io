import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ContactComponent from './components/contact/ContactComponent';

import { setShowStatusBar } from '../controllers/messageSlice';

function Contact() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Contact - Jamel C. Lyons`;
  }, []);

  useEffect(() => {
    dispatch(setShowStatusBar('show'));
  }, []);

  return (
    <>
      <section className="contact">
        <ContactComponent />
      </section>
    </>
  );
}

export default Contact;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ContactComponent from './components/ContactComponent';

import { setShowStatusBar } from '../controllers/messageSlice';

function Contact() {
  const dispatch = useDispatch();

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

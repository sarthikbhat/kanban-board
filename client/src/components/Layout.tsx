import { motion } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
  </>
);
export default Layout;

  // <motion.div
  //   initial={{ x: 300, opacity: 0 }}
  //   animate={{ x: 0, opacity: 1 }}
  //   exit={{ x: 300, opacity: 0 }}
  //   transition={{
  //     type: 'spring',
  //     stiffness: 260,
  //     damping: 20
  //   }}
  // >
  {/* </motion.div> */}

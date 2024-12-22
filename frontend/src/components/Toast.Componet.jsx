import { motion, AnimatePresence } from "framer-motion";
import { Alert } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
const ToastComponet = ({visibility, success, alertMessage}) => {

  return (
    <AnimatePresence>
        {
          visibility ? 
          <motion.div 
          initial = {{opacity : 0, scale : 0} } 
          animate = {{ opacity : 1, scale : 1,}}
          exit={{opacity : 0, size : 0}} 
          transition={{ duration : 0.5, ease: "easeInOut"}}
          className=" container mx-auto w-1/2">
            <Alert variant="faded" color = {success ? "success" : "warning"} >{alertMessage}</Alert>
          </motion.div> : 
          <></>
        }
        
      </AnimatePresence>
  )
}

export default ToastComponet

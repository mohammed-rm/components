"use client";
import { motion, useCycle, AnimatePresence, MotionConfig } from "framer-motion";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";

export default function MobileNavbar() {
  const [mobileNav, toggleMobileNav] = useCycle(false, true); // cycle between true and false each time the function is called ie toggle

  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-stone-700 z-10">
      <div className="container mx-auto flex items-center h-full px-6">
        <div className="relative z-10">
          <motion.button
            animate={mobileNav ? "open" : "closed"} // animate will execute the animation immediately when the component mounts. "closed" and "open" are set in the children ie span variants
            onClick={() => toggleMobileNav()}
            className="flex flex-col space-y-1"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 5 },
              }} // variants will execute the animation when triggered
              className="w-5 h-px bg-white block"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="w-5 h-px bg-white block"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -5 },
              }}
              className="w-5 h-px bg-white block"
            />
          </motion.button>
        </div>
      </div>
      {/* We wrap this conditional in an AnimatePresence so that we can give an animation when we close the navbar, then to make it work we need to define an "exit" prop to the div below */}
      <AnimatePresence>
        {mobileNav && (
          <MotionConfig transition={{ type: "spring", bounce: 0.025 }}>
            <motion.div
              key="mobile-nav" // TO check if this is needed
              variants={{
                open: {
                  x: 0, // Doesn't translate the element, keeps it in place
                  transition: {
                    when: "beforeChildren", // We play the open state of the navbar before the children
                    type: "spring",
                    bounce: 0.025,
                  },
                },
                closed: {
                  x: "-100%", // translates the element to the left 100%
                  transition: {
                    when: "afterChildren", // We play the closed state of the navbar after the children
                    type: "spring",
                    bounce: 0.025,
                  },
                },
              }}
              initial="closed" // Initially the element is in the closed state: VERY IMPORTANT
              animate="open" // And when we open the navbar, it will animate
              exit="closed" // It plays an animation as the components unmounts, in this case we want it to translate the element to the left 100%
              className="fixed inset-0 bg-stone-500 space-y-10 container mx-auto p-6 flex flex-col"
            >
              {/*Children motion components can inherit the parent's variants, so we can use the same variants for the children as we did for the parent.*/}
              <motion.div
                variants={{
                  open: {
                    y: "0%",
                    opacity: 1,
                  },
                  closed: { y: "25%", opacity: 0 },
                }}
                className="flex-1 mt-10"
              >
                <ul className="flex flex-col space-y-4 text-gray-100 text-2xl font-bold">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/">About</Link>
                  </li>
                  <li>
                    <Link href="/">Contact</Link>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                variants={{
                  open: {
                    y: "0%",
                    opacity: 1,
                  },
                  closed: { y: "25%", opacity: 0 },
                }}
                className="w-full bg-gray-200 h-px"
              ></motion.div>
              <motion.div
                variants={{
                  open: {
                    y: "0%",
                    opacity: 1,
                  },
                  closed: { y: "25%", opacity: 0 },
                }}
              >
                <ul className="flex flex-row items-center justify-center space-x-4 text-gray-100">
                  <li className="w-8 h-8 rounded-lg">
                    <FaInstagram className="w-full h-full" />
                  </li>
                  <li className="w-8 h-8 rounded-lg">
                    <RiTwitterXLine className="w-full h-full" />
                  </li>
                  <li className="w-8 h-8 rounded-lg">
                    <CiLinkedin className="w-full h-full" />
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </nav>
  );
}

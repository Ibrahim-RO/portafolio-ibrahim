import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function ButtonTop() {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="fixed right-8 bottom-8 flex items-center justify-center">
            <button
                onClick={scrollToTop}
                className={`${showButton ? 'block' : 'hidden'} bottom-full bg-secondary p-3 rounded-full cursor-pointer`}
            >
                <FaArrowUp className="size-5 text-black" />
            </button>
        </div>
    )
}

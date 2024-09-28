// Importing necessary libraries and modules
import React, { useState, useEffect } from 'react'; // React library and specific hooks
import axios from 'axios'; // Axios for making HTTP requests
import LazyLoad from 'react-lazyload';
import "@fontsource/poppins"; // Poppins font

// Defining a functional component called TextToImageGenerator
const TextToImageGenerator = () => {
    // Defining state variables
    const [text, setText] = useState(''); // State for storing the input text
    const [images, setImages] = useState([]); // State for storing the generated images
    const [loading, setLoading] = useState(false); // State for loading status
    const [currentIndex, setCurrentIndex] = useState(0); // State for tracking the current index of images to display
    const [buttonText, setButtonText] = useState('Random Image Generate'); // State for button text

    // useEffect hook to update button text based on input text
    useEffect(() => {
        setButtonText(text ? 'Generate Image' : 'Random Image Generate');
    }, [text]); // Dependency array with text to re-run effect when text changes

    // Function to generate images based on the input text
    const generateImage = async () => {
        setLoading(true); // Set loading to true when the function starts
        const options = {
            method: 'POST',
            url: 'https://ai-image-generator3.p.rapidapi.com/generate',
            headers: {
                'x-rapidapi-key': '5cb38c4e3amsh62ffe7f11846745p14505cjsn50e223703c27',
                'x-rapidapi-host': 'ai-image-generator3.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                prompt: text, // Data payload with the input text
                page: 1 // Page number for the API request
            }
        };

        try {
            const response = await axios.request(options); // Await the API response
            console.log('API Response:', response); // Log the API response
            setImages(response.data.results.images); // Set the images state with the API response
            setCurrentIndex(0); // Reset the current index
        } catch (error) {
            console.error('Error generating image:', error); // Log any errors
        } finally {
            setLoading(false); // Set loading to false when the function ends
        }
    };

    // Function to load more images
    const loadMoreImages = () => {
        setCurrentIndex(currentIndex + 7); // Increase the current index by 4
    };

    // JSX for rendering the component
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-white tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Text to Image Generator
            </h1>
            <div className="flex flex-col items-center">
                <textarea
                    className="w-full md:w-2/3 lg:w-1/2 p-4 border border-gray-400 rounded-lg mb-6 shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out duration-300"
                    rows="4"
                    placeholder="Enter text to generate your Image..."
                    value={text} // Bind the textarea value to the text state
                    onChange={(e) => setText(e.target.value)} // Update text state on change
                ></textarea>
                <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-xl font-medium rounded-lg text-lg px-6 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    onClick={generateImage} // Call generateImage function on click
                    disabled={loading} // Disable button if loading is true
                >
                    {loading ? 'Generating...' : buttonText} {/* Conditional button text */}
                </button>
             
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{/* Lazy load component */}
                    {images.slice(0, currentIndex + 4).map((image, index) => (
                        <LazyLoad key={index} height={200} offset={100} once>
                            <div className="rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                <img src={image} alt={`Generated ${index}`} className="max-w-full object-cover" loading="lazy" />
                            </div>
                        </LazyLoad>
                    ))}
                </div>
                {currentIndex + 7 < images.length && ( // Show 'Generate More' button if there are more images to display
                    <button
                        className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-xl font-medium rounded-lg text-lg px-6 py-3 mt-8 transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={loadMoreImages} // Call loadMoreImages function on click
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

// Export the TextToImageGenerator component as default
export default TextToImageGenerator;

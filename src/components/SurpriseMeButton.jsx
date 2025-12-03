import React from 'react';

const prompts = [
  'a futuristic synthwave track',
  'a relaxing acoustic guitar melody',
  'an upbeat 8-bit video game theme',
  'a cinematic orchestral piece',
  'a groovy funk bassline',
  'a dreamy lofi hip-hop beat',
  'a high-energy rock anthem',
  'a spooky Halloween-themed track',
  'a cheerful and optimistic pop song',
  'a traditional Japanese koto melody',
];

function SurpriseMeButton({ onSelect }) {
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    onSelect(prompts[randomIndex]);
  };

  return (
    <button 
      onClick={handleClick} 
      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
    >
      🎉 Surprise Me!
    </button>
  );
}

export default SurpriseMeButton;

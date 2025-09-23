/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       descriptionColor:'#A8A8BA',
       buttonTextColor:'#4D4DBD',
       buttonTransparentColor:'#A3A3DE',
       buttonDangerColor:'#BD4D4D',
       labelColor:'#DCDCE3',
       bgDialog:'#222225',
       optionTextColor:'#868695',
       selectedTabBgColor:'#7878CD33',
       tabBorderColor:'#656570',
       tabTextColor:'#CBCBD6',
       dragTextColor:'#CECEEE',
       dragBgColor:'#4D4DBD66',
      },
    },
  },
  plugins: [],
}
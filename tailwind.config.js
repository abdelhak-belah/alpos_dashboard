/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        colors: {
            // generate palette forms #0db7ed
            primary: '#0db7ed',
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#ffffff',
            'red':{
                50: '#fff1f0',
                100: '#ffccc7',
                200: '#ffa39e',
                300: '#ff7875',
                400: '#ff4d4f',
                500: '#f5222d',
                600: '#cf1322',
                700: '#a8071a',
                800: '#820014',
                900: '#5c0011',
            },
            'orange': {
                50: '#fff7e6',
                100: '#ffe7ba',
                200: '#ffd591',
                300: '#ffc069',
                400: '#ffa940',
                500: '#fa8c16',
                600: '#d46b08',
                700: '#ad4e00',
                800: '#873800',
                900: '#612500',
            },
            'yellow': {
                50: '#feffe6',
                100: '#ffffb8',
                200: '#fffb8f',
                300: '#fff566',
                400: '#ffec3d',
                500: '#fadb14',
                600: '#d4b106',
                700: '#ad8b00',
                800: '#876800',
                900: '#614700',

            },
            'gray': {
                50: '#fafafa',
                100: '#f5f5f5',
                200: '#f0f0f0',
                300: '#d9d9d9',
                400: '#bfbfbf',
                500: '#8c8c8c',
                600: '#595959',
                700: '#434343',
                800: '#262626',
                900: '#1f1f1f',
            },
            'green': {
                50: '#f6ffed',
                100: '#d9f7be',
                200: '#b7eb8f',
                300: '#95de64',
                400: '#73d13d',
                500: '#52c41a',
                600: '#389e0d',
                700: '#237804',
                800: '#135200',
                900: '#092b00',
            }
            ,
            'blue': {
                50: '#e6f7ff',
                100: '#bae7ff',
                200: '#91d5ff',
                300: '#69c0ff',
                400: '#40a9ff',
                500: '#1890ff',
                600: '#096dd9',
                700: '#0050b3',
                800: '#003a8c',
                900: '#002766',
            }
        },
        extend: {},
    }
    ,
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
    ],
}


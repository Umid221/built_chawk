const CashIcon = ({
                            width = "35px",
                            height = "35px",
                            color="currentColor"
                        }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512"><rect
            width={width} height={height}
            fill={"none"}/><path d="m339.5 190.1c4 4 10.7 4 14.4 0l20-20.8c4.2-4 4-11.2-.5-15.6-15.7-13.7-34.1-24.2-53.9-30.8l6.3-30.5c1.4-6.7-3.6-12.9-10.3-12.9h-38.8c-5 .1-9.3 3.6-10.3 8.5l-5.6 27.1c-51.6 2.6-95.4 28.9-95.4 82.6 0 46.5 36.2 66.4 74.4 80.2 36.2 13.8 55.3 18.9 55.3 38.3 0 20-19.1 31.7-47.3 31.7-25.7 0-52.6-8.6-73.4-29.5-4.1-4.1-10.7-4.1-14.7 0l-21.5 21.6c-4.2 4.3-4.2 11.1 0 15.4 16.8 16.6 38.2 28.6 62.5 35.3l-5.9 28.6c-1.4 6.7 3.5 12.8 10.2 12.9l38.9.3c5.1 0 9.4-3.5 10.4-8.5l5.6-27.2c62.1-4.2 99.9-38.4 99.9-88.3 0-46-37.7-65.4-83.4-81.2-26.1-9.7-48.7-16.4-48.7-36.3 0-19.4 21.1-27.1 42.2-27.1 26.9 0 52.8 11.1 69.7 26.4z" fill={color}/></svg>

    );
};

export default CashIcon;

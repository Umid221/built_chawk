const PrevIcon = ({
                        color = "currentColor",
                        width = "17px",
                        height = "18px",
                        className = "md:w-4 xl:w-5 md:h-4 xl:h-5",
                    }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 512 512"
            className={className}
        >
            <path
                d="M441.751,475.584L222.166,256L441.75,36.416c6.101-6.101,7.936-15.275,4.629-23.253C443.094,5.184,435.286,0,426.667,0
			H320.001c-5.675,0-11.093,2.24-15.083,6.251L70.251,240.917c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667
			c3.989,4.011,9.408,6.251,15.083,6.251h106.667c8.619,0,16.427-5.184,19.712-13.163
			C449.687,490.858,447.852,481.685,441.751,475.584z"
                fill={color}
            />
        </svg>
    );
};

export default PrevIcon;

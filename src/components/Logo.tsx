import React from "react";

const Logo = ({
  color = "white",
  className,
}: {
  color: string;
  className: string;
}) => {
  return (
    <svg
      width="690"
      height="703"
      viewBox="0 0 690 703"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M184.72 184.951C129.718 141.077 96.2087 113.555 84.1922 102.385C69.4386 85.8971 64.8277 74.6778 70.3596 68.7268C74.934 63.8057 83.2971 62.7265 95.449 65.4891C100.276 66.6265 105.083 67.7647 109.87 68.9035L109.846 68.922C109.998 68.9494 110.15 68.9776 110.303 69.0065C111.994 69.4089 113.682 69.8113 115.368 70.2139C144.449 78.5077 178.685 110.721 187.088 134.381C184.888 148.815 186.796 158.828 192.813 164.422C198.536 169.741 205.703 172.243 214.315 171.929C222.821 171.729 229.946 168.539 235.691 162.359C238.457 159.383 242.081 149.632 246.563 133.106C251.046 116.58 256.85 104.483 263.978 96.815C276.531 83.3108 289.899 75.4706 304.082 73.2944C319.033 70.9796 332.517 75.4072 344.534 86.5772C356.665 97.8536 366.51 116.179 374.07 141.552C381.777 167.916 381.535 185.504 373.343 194.316C360.471 208.163 348.154 216.02 336.392 217.887C324.639 219.974 316.475 223.479 311.9 228.4C305.836 234.923 303.236 242.425 304.098 250.907C304.83 258.841 308 265.414 313.608 270.626C323.45 279.776 340.404 279.074 364.47 268.521C362.758 273.228 362.845 278.896 364.729 285.527C367.132 293.854 371.09 300.324 376.602 304.937C384.391 311.455 393.45 313.534 403.778 311.174C412.785 308.932 420.297 304.216 426.313 297.026C434.736 286.96 459.422 253.321 500.371 196.108C541.32 138.894 567.058 103.997 577.587 91.4144C593.284 75.8219 604.247 70.6328 610.479 75.8471C615.631 80.1589 617.145 88.4544 615.019 100.734C614.135 105.613 613.248 110.473 612.361 115.313L612.341 115.29C612.321 115.443 612.301 115.596 612.28 115.75C611.967 117.46 611.653 119.167 611.338 120.872C604.571 150.346 574.185 186.213 550.995 195.838C536.466 194.392 526.566 196.82 521.293 203.12C516.28 209.112 514.154 216.4 514.917 224.984C515.56 233.468 519.117 240.417 525.587 245.832C528.703 248.439 538.629 251.55 555.367 255.165C572.104 258.781 584.487 263.948 592.516 270.666C606.656 282.498 615.182 295.44 618.094 309.49C621.185 324.301 617.466 337.997 606.937 350.579C596.308 363.281 578.521 374.068 553.575 382.94C527.649 392.009 510.073 392.684 500.846 384.962C486.346 372.829 477.858 360.938 475.381 349.29C472.684 337.661 468.759 329.69 463.607 325.379C456.776 319.663 449.149 317.457 440.724 318.76C432.839 319.904 426.44 323.412 421.527 329.284C412.502 340.069 414.656 358.068 427.988 383.283C428.617 384.459 429.248 385.618 429.881 386.761C425.068 384.938 419.255 385.039 412.441 387.063C404.143 389.567 397.721 393.602 393.175 399.169C386.751 407.036 384.781 416.118 387.264 426.417C389.614 435.397 394.42 442.852 401.681 448.781C411.847 457.083 445.781 481.364 503.481 521.623C561.181 561.883 596.385 587.201 609.093 597.578C624.872 613.087 630.193 623.987 625.053 630.281C620.804 635.485 612.527 637.098 600.223 635.119C595.333 634.294 590.463 633.466 585.613 632.636L585.636 632.616C585.482 632.598 585.328 632.58 585.174 632.561C583.461 632.268 581.75 631.974 580.042 631.681C550.49 625.267 514.26 595.314 504.358 572.24C505.629 557.695 503.083 547.825 496.719 542.629C490.668 537.687 483.355 535.649 474.781 536.515C466.306 537.259 459.399 540.899 454.063 547.435C451.493 550.581 448.501 560.544 445.087 577.324C441.673 594.104 436.655 606.548 430.033 614.656C418.371 628.937 405.533 637.618 391.519 640.698C376.746 643.966 363.006 640.412 350.299 630.035C337.47 619.559 326.471 601.902 317.3 577.065C307.92 551.25 307.035 533.682 314.645 524.364C326.604 509.72 338.392 501.089 350.01 498.473C361.606 495.637 369.528 491.617 373.778 486.413C379.411 479.514 381.526 471.861 380.122 463.452C378.883 455.581 375.299 449.225 369.369 444.382C358.476 435.487 340.504 437.857 315.451 451.491C312.113 453.327 308.911 455.181 305.845 457.052C308.407 453.551 310.833 450.232 313.123 447.097C317.277 441.61 318.047 434.326 315.435 425.247C313.003 416.928 309.024 410.471 303.496 405.877C295.685 399.385 286.62 397.337 276.3 399.731C267.3 402.003 259.804 406.744 253.812 413.954C245.423 424.048 220.85 457.77 180.093 515.12C139.336 572.47 113.714 607.454 103.228 620.072C87.5835 635.717 76.6372 640.942 70.3886 635.749C65.2215 631.454 63.6802 623.164 65.7648 610.878C66.6328 605.995 67.5027 601.132 68.3744 596.289L68.3942 596.313C68.4131 596.159 68.4328 596.006 68.4532 595.852C68.7612 594.141 69.0694 592.433 69.3779 590.727C76.0466 561.231 106.312 525.262 129.47 515.56C144.004 516.957 153.896 514.496 159.147 508.178C164.14 502.169 166.242 494.874 165.45 486.293C164.779 477.811 161.199 470.874 154.71 465.481C151.586 462.884 141.649 459.806 124.899 456.247C108.15 452.688 95.7494 447.562 87.6983 440.871C73.5188 429.086 64.9495 416.173 61.9903 402.133C58.85 387.333 62.5232 373.624 73.0098 361.007C83.5962 348.269 101.347 337.423 126.263 328.468C152.158 319.311 169.732 318.578 178.985 326.268C193.525 338.353 202.053 350.215 204.569 361.855C207.305 373.475 211.256 381.432 216.424 385.727C223.273 391.42 230.908 393.6 239.329 392.269C247.209 391.098 253.597 387.569 258.49 381.681C267.479 370.866 265.265 352.873 251.848 327.703C251.264 326.62 250.678 325.551 250.091 324.496C254.677 326.398 260.297 326.588 266.951 325.067C275.392 323.101 282.06 319.485 286.953 314.221C293.868 306.782 296.416 297.844 294.598 287.408C292.828 278.296 288.51 270.549 281.643 264.166C272.03 255.23 239.722 228.825 184.72 184.951ZM24.1817 25.802C48.8569 -0.742922 87.2589 -6.00299 139.388 10.0218C141.647 10.7162 143.931 11.4505 146.241 12.2248C149.323 13.2538 152.067 14.4952 154.473 15.949C174.658 26.0971 199.79 45.6911 216.372 62.1549C217.856 60.2036 219.362 58.4061 220.89 56.7625C244.294 31.5851 271.074 17.1192 301.231 13.3649C333.039 9.43967 361.303 18.9662 386.023 41.9445C408.797 63.1144 424.815 93.0439 434.078 131.733C437.065 144.063 438.751 155.618 439.136 166.397L441.483 163.239L444.66 158.963C490.058 98.1375 518.272 61.1342 529.302 47.9528C543.842 30.5774 562.63 19.2025 585.668 13.828C611.208 7.89844 632.965 12.4543 650.939 27.4955C678.734 50.7542 685.987 88.8301 672.7 141.723C672.303 143.782 671.717 145.981 670.965 148.294C670.929 148.424 670.893 148.553 670.857 148.682C669.99 151.813 668.893 154.618 667.567 157.096C658.484 177.782 640.226 203.902 624.649 221.319C626.675 222.699 628.548 224.11 630.269 225.55C656.632 247.61 672.473 273.6 677.794 303.52C683.371 335.081 675.33 363.803 653.671 389.686C633.716 413.533 604.662 431.088 566.508 442.354C548.908 447.602 532.789 450.043 518.15 449.676C525.125 454.726 532.393 459.991 539.955 465.471C601.32 510.136 638.659 537.904 651.972 548.775C669.52 563.106 681.12 581.757 686.77 604.728C693.006 630.195 688.711 652.005 673.887 670.158C650.963 698.23 612.977 705.94 559.928 693.288C557.865 692.915 555.66 692.356 553.337 691.632C553.207 691.597 553.078 691.563 552.948 691.529C549.807 690.699 546.989 689.636 544.495 688.34C523.701 679.506 497.365 661.562 479.762 646.195C478.406 648.237 477.018 650.127 475.599 651.866C453.856 678.491 428.058 694.643 398.204 700.322C366.713 706.277 337.896 698.581 311.755 677.234C287.671 657.567 269.768 628.725 258.046 590.709C251.246 568.87 248.83 549.275 250.796 531.924C246.027 538.391 241.071 545.109 235.927 552.078C190.734 613.055 162.644 650.153 151.658 663.371C137.177 680.795 118.426 692.233 95.4067 697.685C69.8872 703.7 48.115 699.217 30.0903 684.236C2.21803 661.07 -5.16319 623.019 7.94659 570.082C8.33707 568.022 8.91564 565.821 9.66011 563.504L9.76623 563.117C10.6228 559.983 11.7101 557.174 13.0282 554.692C22.0415 533.975 40.212 507.795 55.731 490.326C53.7004 488.952 51.8223 487.548 50.0965 486.113C23.6601 464.141 7.73166 438.205 2.31105 408.303C-3.37178 376.761 4.57298 348.012 26.1453 322.056C46.0199 298.143 75.0152 280.49 113.131 269.097C135.738 262.273 155.912 260.099 173.656 262.575C164.573 255.07 154.928 247.095 144.723 238.65C86.3457 190.145 50.8627 160.042 38.2739 148.34C21.6796 132.915 11.299 113.559 7.13209 90.2723C2.54122 64.4585 8.22442 42.9684 24.1817 25.802ZM373.793 369.127C377.25 362.913 378.46 356.025 377.422 348.464C376.169 338.482 371.697 330.296 364.006 323.904C356.316 317.512 347.449 314.613 337.407 315.206C327.585 315.779 319.528 319.851 313.236 327.421C309.616 331.777 307.241 336.496 306.112 341.577C303.03 347.131 301.742 353.229 302.249 359.872C302.083 361.878 302.071 363.935 302.214 366.043C302.872 375.86 307.013 383.881 314.638 390.107C322.262 396.334 330.95 398.788 340.7 397.471C345.987 396.698 350.766 395.018 355.037 392.428C359.387 390.396 363.241 387.373 366.599 383.36C370.258 378.987 372.656 374.243 373.793 369.127Z"
        fill={color}
      />
    </svg>
  );
};

export default Logo;

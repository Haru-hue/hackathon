const showButton = document.getElementById("showButton");
const steps = document.querySelector(".steps");

/* Chevron Arrows Paths */
const down =
  "M6.21967 8.46967C6.51256 8.17678 6.98744 8.17678 7.28033 8.46967L10.75 11.9393L14.2197 8.46967C14.5126 8.17678 14.9874 8.17678 15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L11.2803 13.5303C10.9874 13.8232 10.5126 13.8232 10.2197 13.5303L6.21967 9.53033C5.92678 9.23744 5.92678 8.76256 6.21967 8.46967Z";
const up =
  "M15.0303 12.2803C14.7374 12.5732 14.2626 12.5732 13.9697 12.2803L10.5 8.81066L7.03033 12.2803C6.73744 12.5732 6.26256 12.5732 5.96967 12.2803C5.67678 11.9874 5.67678 11.5126 5.96967 11.2197L9.96967 7.21967C10.2626 6.92678 10.7374 6.92678 11.0303 7.21967L15.0303 11.2197C15.3232 11.5126 15.3232 11.9874 15.0303 12.2803Z";

showButton.addEventListener("click", () => {
  const path = showButton.querySelector("path");
  if (path.getAttribute("d") === up) {
    path.setAttribute("d", down);
  } else {
    path.setAttribute("d", up);
  }
  if (steps.style.display === "none") {
    steps.style.display = "flex";
  } else {
    steps.style.display = "none";
  }
});

const allSteps = document.querySelectorAll(".step");
const counter = document.getElementById("number");
const progress = document.querySelector(".progressBar");

allSteps.forEach((step, index) => {
  const desc = step.querySelector(".desc");
  if (index !== 0) {
    step.style.background = "none";
    desc.style.display = "none";
  } else {
    step.style.background = "#F3F3F3";
    desc.style.display = "flex";
  }
});

const paths = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        r="12"
        stroke="#8A8A8A"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="4 6"
      />
    </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 28" fill="none">
      <path d="M26 14C26 16.3734 25.2962 18.6935 23.9776 20.6668C22.6591 22.6402 20.7849 24.1783 18.5922 25.0866C16.3995 25.9948 13.9867 26.2324 11.6589 25.7694C9.33114 25.3064 7.19295 24.1635 5.51472 22.4853C3.83649 20.8071 2.6936 18.6689 2.23058 16.3411C1.76755 14.0133 2.00519 11.6005 2.91345 9.4078C3.8217 7.21509 5.35977 5.34094 7.33316 4.02236C9.30655 2.70379 11.6266 2 14 2" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#000"></circle>
      <path
        d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
        fill="#fff"
      ></path>
    </svg>`,
];

let currentPath = 0;
let count = 0;
allSteps.forEach((step) => {
  const desc = step.querySelector(".desc");
  const titles = step.querySelectorAll(".title");
  const titleIcons = step.querySelectorAll("#checkBox");

  titleIcons.forEach((icon) => {
    icon.innerHTML = paths[0];
    icon.addEventListener("click", () => {
      const aString = new XMLSerializer().serializeToString(
        new DOMParser().parseFromString(paths[0], "image/svg+xml")
          .documentElement
      );
      const cString = new XMLSerializer().serializeToString(
        new DOMParser().parseFromString(paths[2], "image/svg+xml")
          .documentElement
      );
      const iconString = new XMLSerializer().serializeToString(
        new DOMParser().parseFromString(icon.innerHTML, "image/svg+xml")
          .documentElement
      );

      if (iconString === aString) {
        count++;
        counter.innerHTML = count;
        progress.value = count * 20;

        if (progress.value >= 100) {
          progress.classList.add("completed");
        }

        icon.classList.add("fade");
        icon.innerHTML = paths[1];
        setTimeout(() => {
          icon.innerHTML = paths[2];
          currentPath = 1;
          icon.classList.remove("fade");
        }, 150);

        allSteps.forEach((otherStep) => {
          if (otherStep !== step) {
            otherStep.style.background = "none";
            otherStep.querySelector(".desc").style.display = "none";
          }
        });
        step.style.background = "#F3F3F3";
        desc.style.display = "flex";
      } else if (iconString === cString) {
        count--;
        counter.innerHTML = count;
        progress.value = count * 20;

        if (progress.value < 100) {
          progress.classList.remove("completed");
        }

        icon.classList.add("fade");
        icon.innerHTML = paths[1];
        setTimeout(() => {
          icon.innerHTML = paths[0];
          currentPath = 0;
          icon.classList.remove("fade");
        }, 150);
      }
    });
  });

  titles.forEach((title) => {
    title.addEventListener("click", () => {
      console.log(title, desc, step);
      allSteps.forEach((otherStep) => {
        if (otherStep !== step) {
          otherStep.style.background = "none";
          otherStep.querySelector(".desc").style.display = "none";
        }
      });

      if (desc.style.display === "flex") {
        step.style.background = "none";
        desc.style.display = "none";
      } else {
        step.style.background = "#F3F3F3";
        desc.style.display = "flex";
      }
    });
  });
});

progress.addEventListener("change", () => {
  console.log(progress.value);
});

document.getElementById("searchInput").addEventListener("focus", function () {
  this.parentNode.classList.add("active");
});

document.getElementById("searchInput").addEventListener("blur", function () {
  this.parentNode.classList.remove("active");
});

document.querySelectorAll(".tag, .component").forEach((element) => {
  element.addEventListener("click", function () {
    this.classList.add("active");
  });

  element.addEventListener("mouseleave", function () {
    this.classList.remove("active");
  });
});

const tagMenu = document.getElementById('tagMenu');
const storeMenu = document.getElementById('storeMenu');

document.querySelector('.tag').addEventListener('click', () => {
    if (tagMenu.classList.contains("show")) {
        tagMenu.classList.remove("show");
    } else {
        tagMenu.classList.add("show");
        if(storeMenu.classList.contains("show")) {
            storeMenu.classList.remove("show");
        }
    }
})

document.querySelector('.component').addEventListener('click', () => {
    if (storeMenu.classList.contains("show")) {
        storeMenu.classList.remove("show");
    } else {
        storeMenu.classList.add("show");
        if(tagMenu.classList.contains("show")) {
            tagMenu.classList.remove("show");
        }
    }
})


document.addEventListener('click', (event) => {
  if (!event.target.closest('.tag') && !event.target.closest('.component')) {
      tagMenu.classList.remove('show');
      storeMenu.classList.remove('show');
  }
});

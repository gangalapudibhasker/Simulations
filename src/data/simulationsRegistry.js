export const SIMULATIONS_REGISTRY = {
  6: {
    classInfo: {
      name: "Class 6",
      description: "Introduction to Numbers, Basic Geometry, and Fractions",
      curriculum: "CBSE - Mathematics Fundamentals"
    },
    simulations: [
      {
        id: "fractions-basics",
        title: "Fractions Basics",
        description: "Learn about fractions through interactive visualization",
        chapter: "Ch 7 · Fractions",
        component: "FractionsBasics"
      }
    ]
  },
  7: {
    classInfo: {
      name: "Class 7",
      description: "Integers, Fractions, Decimals, and Geometry",
      curriculum: "CBSE - Number Systems"
    },
    simulations: [
      {
        id: "integers-explorer",
        title: "Integers Explorer",
        description: "Understand positive and negative integers visually",
        chapter: "Ch 1 · Integers",
        component: "IntegersExplorer"
      }
    ]
  },
  8: {
    classInfo: {
      name: "Class 8",
      description: "Rational Numbers, Exponents, and Algebraic Expressions",
      curriculum: "CBSE - Algebra & Numbers"
    },
    simulations: [
      {
        id: "square-cube-numbers",
        title: "Square & Cube Numbers",
        description: "Interactive visual representation of square and cube numbers",
        chapter: "Ch 1 · Exponents",
        component: "SquareCubeNumbers"
      }
    ]
  },
  9: {
    classInfo: {
      name: "Class 9",
      description: "Real Numbers, Polynomials, and Quadratic Equations",
      curriculum: "CBSE - Algebra & Real Numbers"
    },
    simulations: [
      {
        id: "square-cube-numbers",
        title: "Square & Cube Numbers",
        description: "Visualize powers of numbers in 2D and 3D",
        chapter: "Ch 1 · Number Systems",
        component: "SquareCubeNumbers"
      }
    ]
  },
  10: {
    classInfo: {
      name: "Class 10",
      description: "Real Numbers, Polynomials, and Arithmetic Progressions",
      curriculum: "CBSE - Advanced Algebra"
    },
    simulations: [
      {
        id: "real-numbers",
        title: "Real Numbers",
        description: "Euclid's Division Algorithm & Fundamental Theorem of Arithmetic",
        chapter: "Ch 1 · Real Numbers",
        component: "RealNumbers"
      },
      {
        id: "square-cube-numbers",
        title: "Square & Cube Numbers",
        description: "Visualize powers of numbers comprehensively",
        chapter: "Ch 1 · Real Numbers",
        component: "SquareCubeNumbers"
      }
    ]
  }
};

export const getAllSimulations = () => {
  const all = [];
  Object.keys(SIMULATIONS_REGISTRY).forEach(classNum => {
    const classSims = SIMULATIONS_REGISTRY[classNum].simulations;
    all.push(...classSims.map(sim => ({ ...sim, class: classNum })));
  });
  return all;
};

export const getSimulation = (classNum, simId) => {
  const classData = SIMULATIONS_REGISTRY[classNum];
  if (!classData) return null;
  return classData.simulations.find(sim => sim.id === simId);
};

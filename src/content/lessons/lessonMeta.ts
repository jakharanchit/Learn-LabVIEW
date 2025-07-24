// AUTO-GENERATED FILE. DO NOT EDIT.


export interface LessonMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  quiz: { question: string; options: string[]; answer: string }[];
}

export const lessonMeta: LessonMeta[] = [
  {
    "id": "m2-arrays-clusters",
    "title": "Arrays & Clusters",
    "description": "Master LabVIEW's composite data types - learn to create, manipulate, and use arrays and clusters for organizing and processing multiple data values efficiently.",
    "category": "Data Types & Wiring",
    "difficulty": "intermediate",
    "estimatedTime": 22,
    "quiz": [
      {
        "question": "What is the main difference between arrays and clusters?",
        "options": [
          "Arrays hold multiple data types, clusters hold one type",
          "Arrays hold one data type, clusters can hold multiple types",
          "Arrays are faster than clusters",
          "There is no difference"
        ],
        "answer": "Arrays hold one data type, clusters can hold multiple types"
      },
      {
        "question": "What does auto-indexing do in a For Loop?",
        "options": [
          "Automatically counts iterations",
          "Automatically builds arrays from loop data",
          "Automatically stops the loop",
          "Automatically indexes into arrays"
        ],
        "answer": "Automatically builds arrays from loop data"
      }
    ]
  },
  {
    "id": "m2-debugging-basics",
    "title": "Probes, Execution Highlighting & Breakpoints",
    "description": "Master essential debugging techniques including probes, execution highlighting, and breakpoints to troubleshoot your LabVIEW programs effectively.",
    "category": "LabVIEW IDE Fluency",
    "difficulty": "beginner",
    "estimatedTime": 18,
    "quiz": [
      {
        "question": "What tool do you use to check intermediate values on a wire during VI execution?",
        "options": [
          "Breakpoint tool",
          "Probe tool",
          "Positioning tool",
          "Operating tool"
        ],
        "answer": "Probe tool"
      },
      {
        "question": "What happens when execution highlighting is enabled?",
        "options": [
          "The VI runs faster",
          "You can see data flow through wires as animated bubbles",
          "The VI automatically stops at errors",
          "All wires turn red"
        ],
        "answer": "You can see data flow through wires as animated bubbles"
      }
    ]
  },
  {
    "id": "m2-style-guide-basics",
    "title": "LabVIEW Style Guide Essentials",
    "description": "Learn the fundamental coding conventions and best practices that make LabVIEW code professional, readable, and maintainable.",
    "category": "LabVIEW IDE Fluency",
    "difficulty": "beginner",
    "estimatedTime": 20,
    "quiz": [
      {
        "question": "What is the recommended maximum width for LabVIEW block diagrams?",
        "options": [
          "600 pixels",
          "800 pixels",
          "1024 pixels",
          "No limit"
        ],
        "answer": "800 pixels"
      },
      {
        "question": "Which alignment practice improves block diagram readability?",
        "options": [
          "Random placement of objects",
          "Aligning objects along invisible grid lines",
          "Clustering all objects in one corner",
          "Using only diagonal wires"
        ],
        "answer": "Aligning objects along invisible grid lines"
      }
    ]
  },
  {
    "id": "m1-data-types-wiring",
    "title": "LabVIEW Data Types & Wiring Basics",
    "description": "Learn about LabVIEW's fundamental data types including numerics, Booleans, strings, and understand the basics of wiring in the block diagram.",
    "category": "Data Types & Wiring",
    "difficulty": "beginner",
    "estimatedTime": 18,
    "quiz": [
      {
        "question": "What color represents Boolean data in LabVIEW wires?",
        "options": [
          "Orange",
          "Blue",
          "Green",
          "Pink"
        ],
        "answer": "Green"
      },
      {
        "question": "Which data type uses a pink wire in LabVIEW?",
        "options": [
          "Numeric",
          "Boolean",
          "String",
          "Cluster"
        ],
        "answer": "String"
      }
    ]
  },
  {
    "id": "m1-structures-101",
    "title": "Loop & Case Structures 101",
    "description": "Master LabVIEW's fundamental programming structures including For Loops, While Loops, and Case Structures for controlling program execution flow.",
    "category": "Structures 101",
    "difficulty": "beginner",
    "estimatedTime": 20,
    "quiz": [
      {
        "question": "What determines when a For Loop stops executing?",
        "options": [
          "A Boolean condition",
          "The count terminal value",
          "A stop button press",
          "Manual intervention"
        ],
        "answer": "The count terminal value"
      },
      {
        "question": "When does a While Loop check its conditional terminal?",
        "options": [
          "Before each iteration",
          "During each iteration",
          "At the end of each iteration",
          "Only at the start"
        ],
        "answer": "At the end of each iteration"
      }
    ]
  },
  {
    "id": "m1-structures-timing",
    "title": "Simple Timing & Program Control",
    "description": "Learn essential timing functions and techniques to control program execution speed, create delays, and measure elapsed time in LabVIEW.",
    "category": "Structures 101",
    "difficulty": "beginner",
    "estimatedTime": 15,
    "quiz": [
      {
        "question": "Which function causes LabVIEW to wait a specific number of milliseconds?",
        "options": [
          "Tick Count (ms)",
          "Wait Until Next ms Multiple",
          "Wait (ms)",
          "Time Delay"
        ],
        "answer": "Wait (ms)"
      },
      {
        "question": "What happens if you don't include timing functions in continuous loops?",
        "options": [
          "Nothing, it works fine",
          "The loop executes slowly",
          "The loop consumes 100% CPU",
          "LabVIEW automatically adds timing"
        ],
        "answer": "The loop consumes 100% CPU"
      }
    ]
  },
  {
    "id": "m1-mini-project-blink",
    "title": "Mini-Project – Blink-LED VI",
    "description": "Build your first complete LabVIEW application that combines loops, timing, and user controls to create a customizable LED blinker.",
    "category": "Structures 101",
    "difficulty": "beginner",
    "estimatedTime": 25,
    "quiz": [
      {
        "question": "In the Blink-LED project, what determines the blink rate?",
        "options": [
          "The While Loop iteration count",
          "The Wait (ms) function timing",
          "The Boolean LED state",
          "The front panel size"
        ],
        "answer": "The Wait (ms) function timing"
      },
      {
        "question": "Why do we use a Case Structure in the Blink-LED VI?",
        "options": [
          "To create different blink patterns",
          "To control when blinking starts and stops",
          "To change LED colors",
          "To manage multiple LEDs"
        ],
        "answer": "To control when blinking starts and stops"
      }
    ]
  },
  {
    "id": "m1-getting-started-hello-g",
    "title": "Your First VI – \"Hello G\"",
    "description": "Build, run and save a simple VI that demonstrates basic LabVIEW programming concepts including controls, indicators, and wiring.",
    "category": "Getting Started",
    "difficulty": "beginner",
    "estimatedTime": 25,
    "quiz": [
      {
        "question": "What color wire represents Boolean data in LabVIEW?",
        "options": [
          "Orange",
          "Blue",
          "Green",
          "Pink"
        ],
        "answer": "Green"
      },
      {
        "question": "What key toggles between tools while wiring?",
        "options": [
          "Tab",
          "Shift",
          "Spacebar",
          "Ctrl"
        ],
        "answer": "Spacebar"
      }
    ]
  },
  {
    "id": "m1-getting-started-install",
    "title": "Installing LabVIEW & Your First Launch",
    "description": "Set up NI LabVIEW Community Edition, verify licensing, and open LabVIEW for the very first time.",
    "category": "Getting Started",
    "difficulty": "beginner",
    "estimatedTime": 15,
    "quiz": [
      {
        "question": "Which LabVIEW edition is free for personal and non-commercial use?",
        "options": [
          "LabVIEW Professional",
          "LabVIEW FPGA Module",
          "LabVIEW Community Edition",
          "LabVIEW Real-Time Module"
        ],
        "answer": "LabVIEW Community Edition"
      },
      {
        "question": "Which window appears immediately after launching LabVIEW?",
        "options": [
          "Project Explorer",
          "Getting Started",
          "VI Properties",
          "Context Help"
        ],
        "answer": "Getting Started"
      }
    ]
  },
  {
    "id": "m1-getting-started-tour",
    "title": "Touring the LabVIEW IDE",
    "description": "Explore the Project Explorer, palettes, help panes and window shortcuts to master the LabVIEW development environment.",
    "category": "Getting Started",
    "difficulty": "beginner",
    "estimatedTime": 20,
    "quiz": [
      {
        "question": "The palette that contains controls for the front panel is called the ______ palette.",
        "options": [
          "Functions",
          "Tools",
          "Controls",
          "Build"
        ],
        "answer": "Controls"
      },
      {
        "question": "Pressing Ctrl+H opens the ______ window.",
        "options": [
          "Help",
          "History",
          "Hierarchy",
          "Hardware"
        ],
        "answer": "Help"
      }
    ]
  },
  {
    "id": "m1-ide-fluency-help",
    "title": "Context Help & Documentation Tricks",
    "description": "Master LabVIEW's help system, context help window, and documentation features to become self-sufficient in learning new functions.",
    "category": "LabVIEW IDE Fluency",
    "difficulty": "beginner",
    "estimatedTime": 15,
    "quiz": [
      {
        "question": "What keyboard shortcut opens the Context Help window?",
        "options": [
          "Ctrl+G",
          "Ctrl+H",
          "Ctrl+J",
          "Ctrl+K"
        ],
        "answer": "Ctrl+H"
      },
      {
        "question": "The Context Help window automatically updates when you ______.",
        "options": [
          "click on objects",
          "hover over objects",
          "double-click objects",
          "right-click objects"
        ],
        "answer": "hover over objects"
      }
    ]
  },
  {
    "id": "m1-ide-fluency-palettes",
    "title": "Mastering Palettes & Quick-Drop",
    "description": "Learn palette navigation, search, and Quick-Drop shortcuts for rapid LabVIEW development and efficient function placement.",
    "category": "LabVIEW IDE Fluency",
    "difficulty": "beginner",
    "estimatedTime": 18,
    "quiz": [
      {
        "question": "Which shortcut opens Quick-Drop?",
        "options": [
          "Ctrl+Q",
          "Ctrl+Space",
          "Ctrl+Shift",
          "Ctrl+D"
        ],
        "answer": "Ctrl+Space"
      },
      {
        "question": "Sub-palettes are grouped by ______.",
        "options": [
          "data type",
          "color",
          "VI size",
          "author"
        ],
        "answer": "data type"
      }
    ]
  },
  {
    "id": "m2-debugging-basics",
    "title": "Probes, Execution Highlighting & Breakpoints",
    "description": "Learn essential debugging techniques to inspect dataflow, step through code, and fix broken wires.",
    "category": "IDE Fluency",
    "difficulty": "beginner",
    "estimatedTime": 15,
    "quiz": [
      {
        "question": "Which toolbar button highlights animated dataflow on the block diagram?",
        "options": [
          "Continuous Run",
          "Execution Highlighting",
          "Abort",
          "Pause"
        ],
        "answer": "Execution Highlighting"
      },
      {
        "question": "A breakpoint suspends execution when _______.",
        "options": [
          "data arrives at any tunnel",
          "a node first receives all inputs",
          "the VI finishes running",
          "the user presses `Ctrl+H`"
        ],
        "answer": "a node first receives all inputs"
      }
    ]
  },
  {
    "id": "m2-mini-exam-f1",
    "title": "Mini-Exam F1 (Quiz + Graded VI)",
    "description": "Assessment covering LabVIEW fundamentals including IDE navigation, basic programming structures, and debugging techniques.",
    "category": "Fundamentals Assessment",
    "difficulty": "beginner",
    "estimatedTime": 25,
    "quiz": [
      {
        "question": "Which palette contains the While Loop structure?",
        "options": [
          "Controls palette",
          "Programming→Structures",
          "Modern→Boolean",
          "Tools palette"
        ],
        "answer": "Programming→Structures"
      },
      {
        "question": "What does the broken run arrow indicate?",
        "options": [
          "VI is currently running",
          "VI has compilation errors",
          "VI is in debug mode",
          "VI is saved successfully"
        ],
        "answer": "VI has compilation errors"
      }
    ]
  },
  {
    "id": "m2-style-guide-basics",
    "title": "LabVIEW Style Guide Essentials",
    "description": "Learn fundamental LabVIEW programming style guidelines for creating professional, readable, and maintainable code.",
    "category": "LabVIEW IDE Fluency",
    "difficulty": "beginner",
    "estimatedTime": 12,
    "quiz": [
      {
        "question": "What is the recommended maximum wire bend count for clean block diagrams?",
        "options": [
          "2-3 bends per wire",
          "4-5 bends per wire",
          "No limit on bends",
          "Straight wires only"
        ],
        "answer": "2-3 bends per wire"
      },
      {
        "question": "Which direction should data flow in a well-designed LabVIEW block diagram?",
        "options": [
          "Bottom to top",
          "Right to left",
          "Left to right",
          "Top to bottom"
        ],
        "answer": "Left to right"
      }
    ]
  },
  {
    "id": "m3-arrays-clusters-advanced",
    "title": "Advanced Arrays & Clusters",
    "description": "Master complex array operations, multidimensional arrays, advanced clustering techniques, and efficient data manipulation strategies.",
    "category": "Arrays & Clusters",
    "difficulty": "intermediate",
    "estimatedTime": 18,
    "quiz": [
      {
        "question": "What is the maximum number of dimensions supported by LabVIEW arrays?",
        "options": [
          "2 dimensions",
          "8 dimensions",
          "256 dimensions",
          "Limited only by memory"
        ],
        "answer": "Limited only by memory"
      },
      {
        "question": "Which function is most efficient for inserting elements into the middle of a large array?",
        "options": [
          "Insert Into Array",
          "Build Array",
          "Replace Array Subset",
          "Array Concatenation"
        ],
        "answer": "Replace Array Subset"
      }
    ]
  },
  {
    "id": "m3-charts-graphs",
    "title": "Charts, Graphs & Plot Customisation",
    "description": "Master LabVIEW's visual display capabilities with waveform charts, XY graphs, and advanced plotting techniques for data presentation.",
    "category": "Charts & Graphs",
    "difficulty": "intermediate",
    "estimatedTime": 18,
    "quiz": [
      {
        "question": "What is the main difference between a chart and a graph in LabVIEW?",
        "options": [
          "Charts display static data, graphs display dynamic data",
          "Charts accept single points, graphs accept arrays of data",
          "Charts are 2D only, graphs can be 3D",
          "There is no difference"
        ],
        "answer": "Charts accept single points, graphs accept arrays of data"
      },
      {
        "question": "Which graph type is best for plotting parametric equations like circles?",
        "options": [
          "Waveform Graph",
          "Waveform Chart",
          "XY Graph",
          "Intensity Graph"
        ],
        "answer": "XY Graph"
      }
    ]
  },
  {
    "id": "m3-debugging-pro",
    "title": "VI Analyzer & Advanced Debugging",
    "description": "Master VI Analyzer, probes, breakpoints and performance profiling.",
    "category": "Modular VIs & Debug",
    "difficulty": "intermediate",
    "estimatedTime": 15,
    "quiz": [
      {
        "question": "Which tool provides automated style checks?",
        "options": [
          "VI Analyzer",
          "Quick Drop",
          "Probe Watch",
          "Project Explorer"
        ],
        "answer": "VI Analyzer"
      },
      {
        "question": "Execution Highlighting visualizes ______.",
        "options": [
          "dataflow",
          "memory leaks",
          "UI events",
          "file I/O"
        ],
        "answer": "dataflow"
      }
    ]
  },
  {
    "id": "m3-file-io-basics",
    "title": "File I/O Basics – TDMS, CSV, INI",
    "description": "Learn essential file input/output operations in LabVIEW, including TDMS technical data management, CSV spreadsheet files, and INI configuration files.",
    "category": "File I/O & Strings",
    "difficulty": "intermediate",
    "estimatedTime": 20,
    "quiz": [
      {
        "question": "Which file format is specifically designed for technical data in LabVIEW?",
        "options": [
          "CSV",
          "TXT",
          "TDMS",
          "INI"
        ],
        "answer": "TDMS"
      },
      {
        "question": "What is the main advantage of TDMS files over CSV files?",
        "options": [
          "Smaller file size",
          "Human readable format",
          "Built-in metadata and high-speed streaming",
          "Compatible with all software"
        ],
        "answer": "Built-in metadata and high-speed streaming"
      }
    ]
  },
  {
    "id": "m3-file-io-strings",
    "title": "String Handling & Parsing",
    "description": "Master LabVIEW's powerful string manipulation and parsing capabilities, including regular expressions, tokenization, and data extraction from text.",
    "category": "File I/O & Strings",
    "difficulty": "intermediate",
    "estimatedTime": 22,
    "quiz": [
      {
        "question": "Which LabVIEW function is best for splitting a string into multiple parts based on a delimiter?",
        "options": [
          "String Subset",
          "String Replace",
          "Spreadsheet String to Array",
          "String Length"
        ],
        "answer": "Spreadsheet String to Array"
      },
      {
        "question": "What does the regular expression pattern \"\\\\d+\" match?",
        "options": [
          "Any single digit",
          "One or more digits",
          "Any character except digits",
          "Exactly one digit"
        ],
        "answer": "One or more digits"
      }
    ]
  },
  {
    "id": "m3-modular-vis",
    "title": "Icons, Connectors & Modular VIs",
    "description": "Learn to create professional, reusable LabVIEW subVIs with custom icons, connectors, and documentation for scalable applications.",
    "category": "Modular VIs & Debug",
    "difficulty": "intermediate",
    "estimatedTime": 15,
    "quiz": [
      {
        "question": "What is the maximum number of terminals allowed on a LabVIEW connector pane?",
        "options": [
          "12",
          "28",
          "32",
          "64"
        ],
        "answer": "28"
      },
      {
        "question": "Which connector pane pattern is recommended for general-purpose subVIs?",
        "options": [
          "4x2x2x4",
          "5x3x3x5",
          "4x2x2x4 or 5x3x3x5 depending on I/O count",
          "Any pattern as long as it has 8 terminals"
        ],
        "answer": "4x2x2x4 or 5x3x3x5 depending on I/O count"
      }
    ]
  }
];

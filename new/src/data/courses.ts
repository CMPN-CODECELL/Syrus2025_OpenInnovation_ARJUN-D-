// Course data structure for learning center
export const courses = [
  {
    id: 1,
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptographic principles. This comprehensive course covers everything from the basics of blockchain architecture to advanced consensus algorithms and real-world applications across various industries.",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000",
    level: "Beginner",
    duration: "4 hours",
    rating: 4.8,
    students: 1245,
    instructor: "Dr. Sarah Chen",
    featured: true,
    category: "Blockchain",
    modules: [
      {
        id: 1,
        title: "Introduction to Blockchain",
        description: "Understanding the fundamental concepts of blockchain technology and how it revolutionizes data storage and transactions.",
        videoId: "SSo_EIwHSd4",
        duration: "45 min",
        order: 1
      },
      {
        id: 2,
        title: "Distributed Ledger Technology",
        description: "Exploring how distributed ledgers work, their benefits, and how they differ from traditional centralized databases.",
        videoId: "ZE2HxTmxfrI",
        duration: "38 min",
        order: 2
      },
      {
        id: 3,
        title: "Consensus Mechanisms",
        description: "Deep dive into Proof of Work, Proof of Stake, and other consensus mechanisms that secure blockchain networks.",
        videoId: "t59Gq0LxBhg",
        duration: "52 min",
        order: 3
      },
      {
        id: 4,
        title: "Public vs Private Blockchains",
        description: "Understanding the differences between public and private blockchain networks, and their respective use cases.",
        videoId: "WgU5NxUgwQQ",
        duration: "35 min",
        order: 4
      }
    ]
  },
  {
    id: 2,
    title: "Smart Contract Development",
    description: "Master the art of writing secure and efficient smart contracts with Solidity for the Ethereum blockchain. Learn how to design, deploy, and test smart contracts that automate agreements and transactions without intermediaries.",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=1000",
    level: "Intermediate",
    duration: "6 hours",
    rating: 4.9,
    students: 876,
    instructor: "Alex Rodriguez",
    featured: false,
    category: "Development",
    modules: [
      {
        id: 1,
        title: "Solidity Basics",
        description: "Introduction to Solidity programming language, data types, variables, and control structures.",
        videoId: "0aJfCug1zTM",
        duration: "48 min",
        order: 1
      },
      {
        id: 2,
        title: "Smart Contract Structure",
        description: "Understanding the components of a smart contract, including functions, modifiers, and events.",
        videoId: "k9HYC0EJU6E",
        duration: "42 min",
        order: 2
      },
      {
        id: 3,
        title: "Security Best Practices",
        description: "Essential techniques to secure your smart contracts against common vulnerabilities and attacks.",
        videoId: "EOe9N-JuZ3I",
        duration: "55 min",
        order: 3
      },
      {
        id: 4,
        title: "Testing and Deployment",
        description: "Methods for testing smart contracts and deploying them to the Ethereum network safely.",
        videoId: "b7PMJVwbAmA",
        duration: "50 min",
        order: 4
      }
    ]
  },
  {
    id: 3,
    title: "DeFi Fundamentals",
    description: "Understand the world of Decentralized Finance, including lending, borrowing, and yield farming on the blockchain. Learn how DeFi protocols are disrupting traditional financial services and creating new opportunities for financial inclusion.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1000",
    level: "Intermediate",
    duration: "5 hours",
    rating: 4.7,
    students: 925,
    instructor: "Michael Johnson",
    featured: true,
    category: "Finance",
    modules: [
      {
        id: 1,
        title: "Introduction to DeFi",
        description: "Understanding the DeFi ecosystem and its components, including key protocols and platforms.",
        videoId: "BoKKI8arKX8",
        duration: "40 min",
        order: 1
      },
      {
        id: 2,
        title: "Decentralized Exchanges",
        description: "How DEXs work, including AMMs, order books, and liquidity provision mechanisms.",
        videoId: "LpE-LEFiGQA",
        duration: "47 min",
        order: 2
      },
      {
        id: 3,
        title: "Lending and Borrowing Protocols",
        description: "Exploration of protocols like Aave and Compound that enable permissionless lending and borrowing.",
        videoId: "aTp9er6S73M",
        duration: "52 min",
        order: 3
      },
      {
        id: 4,
        title: "Yield Farming Strategies",
        description: "Understanding yield farming, liquidity mining, and strategies for optimizing returns.",
        videoId: "ClnnLI1qDPI",
        duration: "45 min",
        order: 4
      }
    ]
  },
  {
    id: 4,
    title: "NFT Creation and Marketing",
    description: "Learn how to create, mint, and market Non-Fungible Tokens (NFTs) for digital art and collectibles. Discover the tools and techniques needed to succeed in the growing NFT marketplace.",
    image: "https://images.unsplash.com/photo-1645586926869-cb8a0e627631?q=80&w=1000",
    level: "Beginner",
    duration: "4.5 hours",
    rating: 4.6,
    students: 1123,
    instructor: "Emma Williams",
    featured: false,
    category: "Art & Design",
    modules: [
      {
        id: 1,
        title: "NFT Fundamentals",
        description: "Introduction to Non-Fungible Tokens and how they differ from other crypto assets.",
        videoId: "wT3764YQDh4",
        duration: "35 min",
        order: 1
      },
      {
        id: 2,
        title: "Creating Digital Art for NFTs",
        description: "Tools and techniques for creating high-quality digital art suitable for NFT markets.",
        videoId: "XEcoiQr8CGk",
        duration: "42 min",
        order: 2
      },
      {
        id: 3,
        title: "Minting Your First NFT",
        description: "Step-by-step guide to minting NFTs on popular marketplaces like OpenSea and Rarible.",
        videoId: "NjVHCUCFIGM",
        duration: "38 min",
        order: 3
      },
      {
        id: 4,
        title: "Marketing and Selling NFTs",
        description: "Strategies for promoting your NFT collection and building a community around your digital art.",
        videoId: "qNP5zS-ufZg",
        duration: "50 min",
        order: 4
      }
    ]
  },
  {
    id: 5,
    title: "Polygon Development Masterclass",
    description: "Become an expert in developing applications on the Polygon network with this comprehensive masterclass. Learn how to leverage Polygon's Layer 2 scaling solutions to build high-performance dApps with low transaction costs.",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000",
    level: "Advanced",
    duration: "8 hours",
    rating: 4.9,
    students: 673,
    instructor: "David Patel",
    featured: true,
    category: "Development",
    modules: [
      {
        id: 1,
        title: "Introduction to Polygon",
        description: "Understanding Polygon's architecture, benefits, and position in the Ethereum ecosystem.",
        videoId: "0zM2r4Jb8PA",
        duration: "37 min",
        order: 1
      },
      {
        id: 2,
        title: "Setting Up the Development Environment",
        description: "Configuring tools and frameworks needed for Polygon development.",
        videoId: "GKJBEaFdq-4",
        duration: "45 min",
        order: 2
      },
      {
        id: 3,
        title: "Deploying Smart Contracts to Polygon",
        description: "Process and best practices for deploying Solidity contracts to the Polygon network.",
        videoId: "qhqErPngOHA",
        duration: "55 min",
        order: 3
      },
      {
        id: 4,
        title: "Building dApps on Polygon",
        description: "Creating full-stack decentralized applications utilizing Polygon's advantages.",
        videoId: "l_tUozV5Pm8",
        duration: "60 min",
        order: 4
      },
      {
        id: 5,
        title: "Scaling Strategies and Optimizations",
        description: "Advanced techniques for optimizing performance and reducing costs on Polygon.",
        videoId: "DYZp_F_mUxY",
        duration: "50 min",
        order: 5
      }
    ]
  },
  {
    id: 6,
    title: "Web3 Authentication & Identity",
    description: "Explore decentralized authentication systems and digital identity solutions based on blockchain technology. Learn how to implement secure, privacy-preserving authentication in your applications.",
    image: "https://images.unsplash.com/photo-1584771145729-04a0f7062116?q=80&w=1000",
    level: "Intermediate",
    duration: "5.5 hours",
    rating: 4.7,
    students: 842,
    instructor: "Lisa Kumar",
    featured: false,
    category: "Development",
    modules: [
      {
        id: 1,
        title: "Web3 Authentication Fundamentals",
        description: "Understanding the principles of decentralized authentication and how it differs from traditional methods.",
        videoId: "3NHTrUAl5qM",
        duration: "42 min",
        order: 1
      },
      {
        id: 2,
        title: "Implementing Wallet Connect",
        description: "Step-by-step guide to integrating WalletConnect in your applications.",
        videoId: "VZ9KMgqrqVk",
        duration: "48 min",
        order: 2
      },
      {
        id: 3,
        title: "Decentralized Identity Solutions",
        description: "Exploring DIDs, Verifiable Credentials, and Self-Sovereign Identity frameworks.",
        videoId: "Jcfy9wd5bZI",
        duration: "55 min",
        order: 3
      },
      {
        id: 4,
        title: "Zero-Knowledge Proofs for Privacy",
        description: "Implementing ZK-proofs to enhance privacy in authentication systems.",
        videoId: "OcmvMs4AMbM",
        duration: "50 min",
        order: 4
      }
    ]
  },
  {
    id: 7,
    title: "Blockchain for Business Leaders",
    description: "A non-technical course designed for business executives and managers to understand blockchain's strategic implications, use cases, and implementation considerations for enterprises.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
    level: "Beginner",
    duration: "3 hours",
    rating: 4.8,
    students: 1587,
    instructor: "Robert Thompson",
    featured: false,
    category: "Business",
    modules: [
      {
        id: 1,
        title: "Blockchain Value Proposition",
        description: "Understanding how blockchain creates value for businesses across different sectors.",
        videoId: "Pl8OlkkwRpc",
        duration: "35 min",
        order: 1
      },
      {
        id: 2,
        title: "Enterprise Blockchain Ecosystems",
        description: "Exploring major enterprise blockchain platforms like Hyperledger, Corda, and Ethereum Enterprise.",
        videoId: "8u88xIfctSU",
        duration: "40 min",
        order: 2
      },
      {
        id: 3,
        title: "Implementation Strategy",
        description: "Framework for assessing, planning, and executing blockchain initiatives in your organization.",
        videoId: "dB4S1NrSHlg",
        duration: "45 min",
        order: 3
      },
      {
        id: 4,
        title: "Governance and Regulatory Considerations",
        description: "Navigating the legal, compliance, and governance aspects of enterprise blockchain.",
        videoId: "h8-gwqrICrI",
        duration: "30 min",
        order: 4
      }
    ]
  },
  {
    id: 8,
    title: "Blockchain Game Development",
    description: "Learn to build blockchain-based games with ownership of digital assets, play-to-earn mechanics, and decentralized gaming economies using popular game engines and blockchain platforms.",
    image: "https://images.unsplash.com/photo-1608356340959-61125fbeec59?q=80&w=1000",
    level: "Intermediate",
    duration: "7 hours",
    rating: 4.6,
    students: 753,
    instructor: "Jason Nguyen",
    featured: false,
    category: "Development",
    modules: [
      {
        id: 1,
        title: "Blockchain Gaming Fundamentals",
        description: "Introduction to blockchain gaming concepts, tokenomics, and NFT integration.",
        videoId: "X2sYVhvGxH4",
        duration: "40 min",
        order: 1
      },
      {
        id: 2,
        title: "Unity Integration with Web3",
        description: "Setting up Unity for blockchain integration and creating wallet connections.",
        videoId: "_e3aLbzLZmU",
        duration: "55 min",
        order: 2
      },
      {
        id: 3,
        title: "In-Game Asset Tokenization",
        description: "Creating, managing, and trading NFT-based in-game assets.",
        videoId: "2XkV6Gh511A",
        duration: "50 min",
        order: 3
      },
      {
        id: 4,
        title: "Play-to-Earn Mechanics",
        description: "Designing sustainable play-to-earn mechanics and token reward systems.",
        videoId: "V-vxfMY9YpU",
        duration: "45 min",
        order: 4
      }
    ]
  }
]; 
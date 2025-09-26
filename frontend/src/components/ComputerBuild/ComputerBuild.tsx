'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ComputerPart {
  id: string
  name: string
  type: string
  price: number
  performance: number
}

interface Game {
  id: string
  name: string
  image: string
  requirements: {
    cpu: number
    gpu: number
    ram: number
  }
}

interface Notebook {
  id: string
  name: string
  specs: {
    cpu: string
    gpu: string
    ram: string
    storage: string
  }
  price: number
  image: string
}

interface PriceItem {
  store: string
  price: number
  link: string
  availability: boolean
  logo: string
}

interface PartPrice {
  name: string
  type: string
  brand: string
  prices: PriceItem[]
  image: string
}

interface User {
  id: string
  name: string
  avatar: string
}

interface CommunityBuild {
  id: string
  name: string
  user: User
  components: {
    cpu: string
    gpu: string
    ram: string
    storage: string
    motherboard: string
  }
  totalPrice: number
  performance: string
  likes: number
  targetSoftware: string
}

interface RecommendedBuild {
  id: string
  name: string
  components: {
    cpu: string
    gpu: string
    ram: string
    storage: string
    motherboard: string
    psu: string
  }
  totalPrice: number
  performance: string
  targetSoftware: string
}

interface Software {
  id: string
  name: string
  image: string
  category: 'design' | 'engineering' | 'video' | 'productivity' | 'development'
  requirements: {
    cpu: number
    gpu: number
    ram: number
  }
}

interface SavedConfiguration {
  id: string
  name: string
  parts: { [key: string]: ComputerPart }
  totalPrice: number
  createdAt: Date
  targetGame?: Game
  targetSoftware?: Software
}

export default function PCBuild() {
  const [buildMode, setBuildMode] = useState<'manual' | 'automatic'>('manual')
  const [selectedParts, setSelectedParts] = useState<{ [key: string]: ComputerPart }>({})
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [selectedSoftware, setSelectedSoftware] = useState<Game | Software | null>(null)
  const [recommendationType, setRecommendationType] = useState<'games' | 'software'>('games')
  const [showNotebooks, setShowNotebooks] = useState(false)
  const [showPrices, setShowPrices] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [gameSearchQuery, setGameSearchQuery] = useState('')
  const [softwareSearchQuery, setSoftwareSearchQuery] = useState('')
  const [showGameDropdown, setShowGameDropdown] = useState(false)
  const [showSoftwareDropdown, setShowSoftwareDropdown] = useState(false)
  const [softwareCurrentPage, setSoftwareCurrentPage] = useState(1)
  const [softwareItemsPerPage] = useState(4) 
  const [gameCurrentPage, setGameCurrentPage] = useState(1)
  const [gameItemsPerPage] = useState(4) 
  const [showPartsDetail, setShowPartsDetail] = useState(false)
  const [savedConfigurations, setSavedConfigurations] = useState<SavedConfiguration[]>([])
  const [showSavedList, setShowSavedList] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false) 
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  

  const [componentSearchQueries, setComponentSearchQueries] = useState<{[key: string]: string}>({})
  const [showComponentDropdowns, setShowComponentDropdowns] = useState<{[key: string]: boolean}>({})


  const [showRecommendations, setShowRecommendations] = useState(false)
  const [recommendationTab, setRecommendationTab] = useState<'algorithm' | 'community' | 'notebooks'>('algorithm')


  const [showFilters, setShowFilters] = useState(false)
  const [priceFilterType, setPriceFilterType] = useState<string>('all')
  const [priceFilterBrand, setPriceFilterBrand] = useState<string>('all')
  const [priceRangeMin, setPriceRangeMin] = useState<number>(0)
  const [priceRangeMax, setPriceRangeMax] = useState<number>(10000)


  useEffect(() => {
    if (isUserLoggedIn) {
      try {
        const savedData = localStorage.getItem('ekhytera-saved-configs')
        if (savedData) {
          const configs = JSON.parse(savedData).map((config: any) => ({
            ...config,
            createdAt: new Date(config.createdAt)
          }))
          setSavedConfigurations(configs)
        }
      } catch (error) {
        console.warn('Erro ao carregar configurações salvas:', error)
      }
    } else {
      
      setSavedConfigurations([])
    }
  }, [isUserLoggedIn])

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.component-search-container')) {
        setShowComponentDropdowns({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  const [partPrices] = useState<PartPrice[]>([
    {
      name: 'Intel Core i7-13700K',
      type: 'Processador',
      brand: 'Intel',
      image: 'https://elitehubs.com/cdn/shop/products/bx8071513700k-image-main-600x600-1-2.jpg?v=1683976339',
      prices: [
        { store: 'Kabum', price: 2799.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 2899.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 2849.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'AMD Ryzen 7 7700X',
      type: 'Processador',
      brand: 'AMD',
      image: 'https://m.media-amazon.com/images/I/51hfER1cZVL.jpg',
      prices: [
        { store: 'Kabum', price: 2299.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 2399.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 2349.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'RTX 4070',
      type: 'Placa de Vídeo',
      brand: 'NVIDIA',
      image: 'https://images1.kabum.com.br/produtos/fotos/517751/placa-de-video-rtx-4070-super-gigabyte-windforce-nvidia-geforce-12gb-gddr6-dlss-ray-tracing-gv-n407swf3-12gd_1707245338_gg.jpg',
      prices: [
        { store: 'Kabum', price: 3499.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 3599.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 3449.90, link: 'https://www.pichau.com.br', availability: false, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'RX 6600 XT',
      type: 'Placa de Vídeo',
      brand: 'AMD',
      image: 'https://m.media-amazon.com/images/I/71Exns6BrvL.jpg',
      prices: [
        { store: 'Kabum', price: 1899.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 1949.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 1879.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'Corsair Vengeance LPX 16GB DDR4',
      type: 'Memória RAM',
      brand: 'Corsair',
      image: 'https://images.kabum.com.br/produtos/fotos/583182/memoria-ram-corsair-vengeance-lpx-16gb-1x16gb-3200mhz-ddr4-cl16-preto-cmk16gx4m1e3200c16_1722861854_gg.jpg',
      prices: [
        { store: 'Kabum', price: 599.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 649.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 619.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'G.Skill Ripjaws V 32GB DDR4',
      type: 'Memória RAM',
      brand: 'G.Skill',
      image: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/f/4/f4-4000c16d-32gvka2.jpg',
      prices: [
        { store: 'Kabum', price: 899.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 929.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 879.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'Samsung SSD 980 1TB NVMe',
      type: 'Armazenamento',
      brand: 'Samsung',
      image: 'https://m.media-amazon.com/images/I/71y8ZxXgVOL.jpg',
      prices: [
        { store: 'Kabum', price: 449.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 479.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 459.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'WD Black SN850X 2TB NVMe',
      type: 'Armazenamento',
      brand: 'Western Digital',
      image: 'https://m.media-amazon.com/images/I/71IZKPoBjOL.jpg',
      prices: [
        { store: 'Kabum', price: 899.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 949.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 879.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'ASUS ROG Strix Z790-E',
      type: 'Placa-Mãe',
      brand: 'ASUS',
      image: 'https://m.media-amazon.com/images/I/81b6EGY2FPL.jpg',
      prices: [
        { store: 'Kabum', price: 1599.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 1649.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 1579.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
    {
      name: 'MSI MAG B550M Mortar WiFi',
      type: 'Placa-Mãe',
      brand: 'MSI',
      image: 'https://asset.msi.com/resize/image/global/product/product_4_20200520154848_5ec4e0e017f7e.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
      prices: [
        { store: 'Kabum', price: 799.90, link: 'https://www.kabum.com.br', availability: true, logo: 'https://www.kabum.com.br/hotsite/app/img/icone-app2.webp' },
        { store: 'Terabyte', price: 829.90, link: 'https://www.terabyteshop.com.br', availability: true, logo: 'https://img.terabyteshop.com.br/header-logo.png' },
        { store: 'Pichau', price: 779.90, link: 'https://www.pichau.com.br', availability: true, logo: 'https://hotsite.pichau.com.br/pichaugaming/cepheusvpro24/images/logo-pichau.png' },
      ]
    },
  ])


  const availableParts: ComputerPart[] = [

    { id: '1', name: 'Intel Core i7-13700K', type: 'cpu', price: 2800, performance: 90 },
    { id: '2', name: 'AMD Ryzen 7 7800X', type: 'cpu', price: 2600, performance: 88 },
    { id: '3', name: 'Intel Core i5-13600K', type: 'cpu', price: 1800, performance: 82 },
    { id: '4', name: 'AMD Ryzen 5 7600X', type: 'cpu', price: 1600, performance: 80 },

    { id: '5', name: 'NVIDIA RTX 4070', type: 'gpu', price: 3500, performance: 85 },
    { id: '6', name: 'AMD RX 6800 XT', type: 'gpu', price: 3200, performance: 83 },
    { id: '7', name: 'NVIDIA RTX 4060 Ti', type: 'gpu', price: 2500, performance: 78 },
    { id: '8', name: 'AMD RX 6700 XT', type: 'gpu', price: 2300, performance: 75 },

    { id: '9', name: '32GB DDR5 6000MHz', type: 'ram', price: 1200, performance: 90 },
    { id: '10', name: '16GB DDR5 5600MHz', type: 'ram', price: 600, performance: 85 },
    { id: '11', name: '32GB DDR4 3600MHz', type: 'ram', price: 800, performance: 75 },
    { id: '12', name: '16GB DDR4 3200MHz', type: 'ram', price: 400, performance: 70 },

    { id: '13', name: 'Samsung 2TB NVMe Gen4', type: 'storage', price: 1000, performance: 90 },
    { id: '14', name: 'WD Black 1TB NVMe Gen4', type: 'storage', price: 600, performance: 85 },
    { id: '15', name: 'Crucial 2TB SATA SSD', type: 'storage', price: 700, performance: 70 },
    { id: '16', name: 'Seagate 2TB HDD', type: 'storage', price: 300, performance: 50 },
 
    { id: '17', name: 'ASUS ROG Z790', type: 'motherboard', price: 2500, performance: 90 },
    { id: '18', name: 'MSI MPG B650', type: 'motherboard', price: 1500, performance: 85 },
    { id: '19', name: 'Gigabyte B760', type: 'motherboard', price: 1000, performance: 80 },
    { id: '20', name: 'ASRock B650', type: 'motherboard', price: 800, performance: 75 },
 
    { id: '21', name: 'Corsair RM850x', type: 'psu', price: 800, performance: 90 },
    { id: '22', name: 'EVGA 750W G5', type: 'psu', price: 600, performance: 85 },
    { id: '23', name: 'Be Quiet! 650W', type: 'psu', price: 500, performance: 80 },
    { id: '24', name: 'Thermaltake 600W', type: 'psu', price: 400, performance: 75 },

    { id: '25', name: 'Lian Li O11 Dynamic', type: 'case', price: 800, performance: 90 },
    { id: '26', name: 'NZXT H510', type: 'case', price: 500, performance: 85 },
    { id: '27', name: 'Corsair 4000D', type: 'case', price: 400, performance: 80 },
    { id: '28', name: 'Phanteks P300A', type: 'case', price: 300, performance: 75 }
  ]

  const games: Game[] = [
    {
      id: '1',
      name: 'Cyberpunk 2077',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
      requirements: { cpu: 80, gpu: 85, ram: 16 }
    },
    {
      id: '2',
      name: 'CS2',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
      requirements: { cpu: 70, gpu: 70, ram: 8 }
    },
    {
      id: '3',
      name: 'Red Dead Redemption 2',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
      requirements: { cpu: 75, gpu: 80, ram: 12 }
    },
    {
      id: '4',
      name: 'Microsoft Flight Simulator',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1250410/header.jpg',
      requirements: { cpu: 85, gpu: 85, ram: 16 }
    },
    {
      id: '5',
      name: 'League of Legends',
      image: 'https://source.roboflow.com/52wBQvr2J7StQoLIQ4WNRmQlEMR2/1EKUYfiLz1muJnjQvuIc/original.jpg',
      requirements: { cpu: 50, gpu: 50, ram: 4 }
    },
    {
      id: '6',
      name: 'Hollow Knight: Silksong',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1030300/header.jpg',
      requirements: { cpu: 60, gpu: 65, ram: 8 }
    },
    {
      id: '7',
      name: 'Assassin\'s Creed Shadows',
      image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/d96bb958-4e6c-4ce0-9447-fbe226fbbecf/dhlqcqe-a0cf53ec-0e34-44bd-8239-3efe1a45d781.jpg',
      requirements: { cpu: 85, gpu: 90, ram: 16 }
    },
    {
      id: '8',
      name: 'Rematch',
      image: 'https://pbs.twimg.com/media/Gsmr8NkX0AARs6l.jpg',
      requirements: { cpu: 75, gpu: 80, ram: 12 }
    },
    {
      id: '9',
      name: 'Grand Theft Auto VI',
      image: 'https://pbs.twimg.com/media/GqRDpg-XQAAu7wI.jpg',
      requirements: { cpu: 90, gpu: 95, ram: 32 }
    },
    {
      id: '10',
      name: 'Monster Hunter Wilds',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2246340/header.jpg',
      requirements: { cpu: 80, gpu: 85, ram: 16 }
    },
    {
      id: '11',
      name: 'Death Stranding 2: On the Beach',
      image: 'https://pbs.twimg.com/media/GsyWgilWYAAPTzp.jpg',
      requirements: { cpu: 85, gpu: 90, ram: 16 }
    },
    {
      id: '12',
      name: 'Doom: The Dark Ages',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2280550/header.jpg',
      requirements: { cpu: 80, gpu: 85, ram: 16 }
    },
    {
      id: '13',
      name: 'Civilization VII',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1295660/header.jpg',
      requirements: { cpu: 75, gpu: 70, ram: 16 }
    }
  ]

  const softwareList: Software[] = [
    {
      id: '1',
      name: 'AutoCAD',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0F48B6vgdbr_kXwxPCURWqsR_5axtGRkfJA&s',
      category: 'engineering',
      requirements: { cpu: 75, gpu: 70, ram: 16 }
    },
    {
      id: '2',
      name: 'Adobe Photoshop',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1200px-Adobe_Photoshop_CC_icon.svg.png',
      category: 'design',
      requirements: { cpu: 70, gpu: 75, ram: 16 }
    },
    {
      id: '3',
      name: 'Fusion 360',
      image: 'https://images.seeklogo.com/logo-png/48/1/autodesk-fusion-360-logo-png_seeklogo-482400.png',
      category: 'engineering',
      requirements: { cpu: 80, gpu: 80, ram: 16 }
    },
    {
      id: '4',
      name: 'Adobe After Effects',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/1200px-Adobe_After_Effects_CC_icon.svg.png',
      category: 'video',
      requirements: { cpu: 85, gpu: 85, ram: 32 }
    },
    {
      id: '5',
      name: 'SolidWorks',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/SolidWorks_Logo.svg/1200px-SolidWorks_Logo.svg.png',
      category: 'engineering',
      requirements: { cpu: 85, gpu: 85, ram: 32 }
    },
    {
      id: '6',
      name: 'Adobe Premiere Pro',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1200px-Adobe_Premiere_Pro_CC_icon.svg.png',
      category: 'video',
      requirements: { cpu: 80, gpu: 85, ram: 32 }
    },
    {
      id: '7',
      name: 'Blender',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/1200px-Blender_logo_no_text.svg.png',
      category: 'design',
      requirements: { cpu: 75, gpu: 90, ram: 16 }
    },
    {
      id: '8',
      name: 'Visual Studio Code',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png',
      category: 'development',
      requirements: { cpu: 60, gpu: 50, ram: 8 }
    }
  ]

  const notebooks: Notebook[] = [
    {
      id: '1',
      name: 'Alienware m16',
      specs: {
        cpu: 'Intel Core i9-13900HX',
        gpu: 'NVIDIA RTX 4090',
        ram: '32GB DDR5',
        storage: '2TB SSD'
      },
      price: 15000,
      image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/alienware-notebooks/alienware-m16-r2-intel/media-gallery/laptop-aw-m16r2-nt-bk-gallery-3.psd?fmt=pjpg&pscan=auto&scl=1&wid=4281&hei=3372&qlt=100,1&resMode=sharp2&size=4281,3372&chrss=full&imwidth=5000'
    },
    {
      id: '2',
      name: 'ASUS ROG Zephyrus G14',
      specs: {
        cpu: 'AMD Ryzen 9 7940HS',
        gpu: 'NVIDIA RTX 4070',
        ram: '16GB DDR5',
        storage: '1TB SSD'
      },
      price: 12000,
      image: 'https://m.media-amazon.com/images/I/71o6nKXmjTL.jpg'
    },
    {
      id: '3',
      name: 'Lenovo Legion Pro 5',
      specs: {
        cpu: 'AMD Ryzen 7 7745HX',
        gpu: 'NVIDIA RTX 4060',
        ram: '16GB DDR5',
        storage: '512GB SSD'
      },
      price: 8000,
      image: 'https://m.media-amazon.com/images/I/71it1s5ZRCL._UF894,1000_QL80_.jpg'
    },
    {
      id: '4',
      name: 'Acer Nitro 5',
      specs: {
        cpu: 'Intel Core i5-13500H',
        gpu: 'NVIDIA RTX 3050',
        ram: '16GB DDR5',
        storage: '512GB SSD'
      },
      price: 5000,
      image: 'https://m.media-amazon.com/images/I/71ctRE34RuL._UF894,1000_QL80_.jpg'
    }
  ]


  const recommendedBuilds: RecommendedBuild[] = [
    {
      id: '1',
      name: 'Build Gaming High-End',
      components: {
        cpu: 'Intel Core i7-13700K',
        gpu: 'NVIDIA RTX 4070 Ti',
        ram: '32GB DDR5',
        storage: '1TB NVMe SSD',
        motherboard: 'ASUS ROG STRIX Z790-E',
        psu: '750W 80+ Gold'
      },
      totalPrice: 12500,
      performance: 'Excelente para jogos em 1440p',
      targetSoftware: 'Cyberpunk 2077'
    },
    {
      id: '2',
      name: 'Build Creator Pro',
      components: {
        cpu: 'AMD Ryzen 9 7900X',
        gpu: 'NVIDIA RTX 4080',
        ram: '64GB DDR5',
        storage: '2TB NVMe SSD',
        motherboard: 'MSI MEG X670E ACE',
        psu: '850W 80+ Platinum'
      },
      totalPrice: 18000,
      performance: 'Ideal para edição profissional',
      targetSoftware: 'Adobe Premiere Pro'
    }
  ]

  const communityBuilds: CommunityBuild[] = [
    {
      id: '1',
      name: 'Setup Gamer Budget',
      user: {
        id: '1',
        name: 'Pedro_Gamer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
      },
      components: {
        cpu: 'AMD Ryzen 5 5600X',
        gpu: 'NVIDIA RTX 3060',
        ram: '16GB DDR4',
        storage: '500GB SSD',
        motherboard: 'MSI B450M PRO-VDH MAX'
      },
      totalPrice: 4500,
      performance: 'Ótimo custo-benefício',
      likes: 124,
      targetSoftware: 'Valorant'
    },
    {
      id: '2',
      name: 'Workstation Pro',
      user: {
        id: '2',
        name: 'Ana_Designer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b776?w=40&h=40&fit=crop&crop=face'
      },
      components: {
        cpu: 'Intel Core i9-13900K',
        gpu: 'NVIDIA RTX 4090',
        ram: '128GB DDR5',
        storage: '4TB NVMe SSD',
        motherboard: 'ASUS ProArt Z790-CREATOR'
      },
      totalPrice: 25000,
      performance: 'Máxima performance profissional',
      likes: 89,
      targetSoftware: 'Blender'
    }
  ]

  const calculateTotal = () => {
    return Object.values(selectedParts).reduce((total, part) => total + part.price, 0)
  }

  const saveCurrentConfiguration = () => {
    if (!isUserLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    if (Object.keys(selectedParts).length === 0) {
      alert('Nenhuma peça selecionada para salvar!')
      return
    }

    const configName = prompt('Digite um nome para esta configuração:')
    if (!configName) return

    const newConfig: SavedConfiguration = {
      id: Date.now().toString(),
      name: configName,
      parts: { ...selectedParts },
      totalPrice: calculateTotal(),
      createdAt: new Date(),
      targetGame: selectedGame || undefined,
      targetSoftware: (selectedSoftware && 'category' in selectedSoftware) ? selectedSoftware : undefined
    }

    const updatedConfigs = [...savedConfigurations, newConfig]
    setSavedConfigurations(updatedConfigs)
    
    try {
      localStorage.setItem('ekhytera-saved-configs', JSON.stringify(updatedConfigs))
    } catch (error) {
      console.warn('Não foi possível salvar no localStorage:', error)
    }
    
    alert('Configuração salva com sucesso!')
  }

  const loadConfiguration = (config: SavedConfiguration) => {
    setSelectedParts(config.parts)
    if (config.targetGame) {
      setSelectedGame(config.targetGame)
      setRecommendationType('games')
    }
    if (config.targetSoftware) {
      setSelectedSoftware(config.targetSoftware)
      setRecommendationType('software')
    }
    setShowSavedList(false)
    alert(`Configuração "${config.name}" carregada!`)
  }

  const deleteConfiguration = (configId: string) => {
    if (confirm('Tem certeza que deseja excluir esta configuração?')) {
      const updatedConfigs = savedConfigurations.filter(config => config.id !== configId)
      setSavedConfigurations(updatedConfigs)
      

      try {
        localStorage.setItem('ekhytera-saved-configs', JSON.stringify(updatedConfigs))
      } catch (error) {
        console.warn('Não foi possível atualizar no localStorage:', error)
      }
    }
  }


  const getPartIcon = (type: string) => {
    const iconProps = "w-5 h-5"
    
    switch (type) {
      case 'cpu':
        return (
          <svg className={iconProps} fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#79A7DD" />
                <stop offset="100%" stopColor="#a3c5ee" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3h6m-6 0v2m6-2v2M9 19h6m-6 0v2m6-2v2M5 7h2m-2 0v2m2-2h2m8 0h2m-2 0v2m2-2V7m0 2v2m0-2h-2M7 7h10v10H7V7z"
              stroke={`url(#gradient-${type})`}
            />
          </svg>
        )
      case 'gpu':
        return (
          <svg className={iconProps} fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#79A7DD" />
                <stop offset="100%" stopColor="#a3c5ee" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16v12H4V6z M8 10h8v4H8v-4z M6 8v8 M18 8v8 M10 6V4 M14 6V4 M10 18v2 M14 18v2"
              stroke={`url(#gradient-${type})`}
            />
          </svg>
        )
      case 'ram':
        return (
          <svg className={iconProps} fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#79A7DD" />
                <stop offset="100%" stopColor="#a3c5ee" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16v8H4V8z M6 6v2 M10 6v2 M14 6v2 M18 6v2 M6 16v2 M10 16v2 M14 16v2 M18 16v2"
              stroke={`url(#gradient-${type})`}
            />
          </svg>
        )
      case 'storage':
        return (
          <svg className={iconProps} fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#79A7DD" />
                <stop offset="100%" stopColor="#a3c5ee" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2z M8 11h8 M8 15h6"
              stroke={`url(#gradient-${type})`}
            />
          </svg>
        )
      case 'motherboard':
        return (
          <svg className={iconProps} fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#79A7DD" />
                <stop offset="100%" stopColor="#a3c5ee" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h18v14H3V5z M7 9h2v2H7V9z M14 9h3v2h-3V9z M7 13h2v2H7v-2z M14 13h3v2h-3v-2z M11 7v2 M11 15v2"
              stroke={`url(#gradient-${type})`}
            />
          </svg>
        )
      case 'psu':
        return (
          <svg className={iconProps} fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#79A7DD" />
                <stop offset="100%" stopColor="#a3c5ee" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16v12H4V6z M8 9v6 M12 9v6 M16 9v6 M6 15h2 M6 9h2"
              stroke={`url(#gradient-${type})`}
            />
          </svg>
        )
      case 'case':
        return (
          <svg className={iconProps} fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#79A7DD" />
                <stop offset="100%" stopColor="#a3c5ee" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 3h12v18H6V3z M9 7h6v2H9V7z M9 11h6v2H9v-2z M9 15h6v2H9v-2z M12 19v1"
              stroke={`url(#gradient-${type})`}
            />
          </svg>
        )
      default:
        return (
          <svg className={iconProps} fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`gradient-default`} x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#79A7DD" />
                <stop offset="100%" stopColor="#a3c5ee" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              stroke={`url(#gradient-default)`}
            />
          </svg>
        )
    }
  }


  const getPartNameInPortuguese = (type: string) => {
    switch (type) {
      case 'cpu': return 'Processador'
      case 'gpu': return 'Placa de Vídeo'
      case 'ram': return 'Memória RAM'
      case 'storage': return 'Armazenamento'
      case 'motherboard': return 'Placa-Mãe'
      case 'psu': return 'Fonte de Alimentação'
      case 'case': return 'Gabinete'
      default: return type.toUpperCase()
    }
  }


  const getFilteredComponents = (type: string) => {
    const query = componentSearchQueries[type] || ''
    const components = availableParts.filter(part => part.type === type)
    
    if (!query.trim()) return components
    
    return components.filter(part =>
      part.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  
  const handleComponentSearch = (type: string, query: string) => {
    setComponentSearchQueries(prev => ({ ...prev, [type]: query }))
    setShowComponentDropdowns(prev => ({ ...prev, [type]: true }))
  }


  const handleComponentFocus = (type: string) => {
    setShowComponentDropdowns(prev => ({ ...prev, [type]: true }))
  }


  const handleComponentSelection = (part: ComputerPart, type: string) => {
    handlePartSelection(part)
    setComponentSearchQueries(prev => ({ ...prev, [type]: part.name }))
    setShowComponentDropdowns(prev => ({ ...prev, [type]: false }))
  }


  const clearComponentSearch = (type: string) => {
    setComponentSearchQueries(prev => ({ ...prev, [type]: '' }))
    setShowComponentDropdowns(prev => ({ ...prev, [type]: false }))
    setSelectedParts(prev => {
      const newParts = { ...prev }
      delete newParts[type]
      return newParts
    })
  }

  const handlePartSelection = (part: ComputerPart) => {
    setSelectedParts(prev => ({
      ...prev,
      [part.type]: part
    }))
  }

  const handleGameSelection = (game: Game) => {
    setSelectedGame(game)
    setSelectedSoftware(game) 
    
    const recommendedParts = availableParts.reduce((acc, part) => {
      if (part.performance >= game.requirements[part.type as keyof typeof game.requirements]) {
        if (!acc[part.type] || acc[part.type].price > part.price) {
          acc[part.type] = part
        }
      }
      return acc
    }, {} as { [key: string]: ComputerPart })

    setSelectedParts(recommendedParts)
  }

  const handleSoftwareSelection = (softwareId: string) => {
    const software = softwareList.find(s => s.id === softwareId)
    if (software) {
      setSelectedSoftware(software)
      
      const recommendedParts = availableParts.reduce((acc, part) => {
        if (part.performance >= software.requirements[part.type as keyof typeof software.requirements]) {
          if (!acc[part.type] || acc[part.type].price > part.price) {
            acc[part.type] = part
          }
        }
        return acc
      }, {} as { [key: string]: ComputerPart })

      setSelectedParts(recommendedParts)
    }
  }

  
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(gameSearchQuery.toLowerCase())
  )

  const filteredSoftware = softwareList.filter(software =>
    software.name.toLowerCase().includes(softwareSearchQuery.toLowerCase()) ||
    software.category.toLowerCase().includes(softwareSearchQuery.toLowerCase())
  )

  
  const filteredPrices = partPrices.filter(part => {
    const matchesType = priceFilterType === 'all' || part.type === priceFilterType
    const matchesBrand = priceFilterBrand === 'all' || part.brand === priceFilterBrand
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.brand.toLowerCase().includes(searchQuery.toLowerCase())
    
   
    const lowestPrice = Math.min(...part.prices.map(p => p.price))
    const matchesPriceRange = lowestPrice >= priceRangeMin && lowestPrice <= priceRangeMax
    
    return matchesType && matchesBrand && matchesSearch && matchesPriceRange
  })

  
  const availableTypes = [...new Set(partPrices.map(part => part.type))]
  const availableBrands = [...new Set(partPrices.map(part => part.brand))]

  
  const totalGamePages = Math.ceil(filteredGames.length / gameItemsPerPage)
  const gameStartIndex = (gameCurrentPage - 1) * gameItemsPerPage
  const gameEndIndex = gameStartIndex + gameItemsPerPage
  const currentGameItems = filteredGames.slice(gameStartIndex, gameEndIndex)

  
  const totalSoftwarePages = Math.ceil(filteredSoftware.length / softwareItemsPerPage)
  const startIndex = (softwareCurrentPage - 1) * softwareItemsPerPage
  const endIndex = startIndex + softwareItemsPerPage
  const currentSoftwareItems = filteredSoftware.slice(startIndex, endIndex)

  
  useEffect(() => {
    setGameCurrentPage(1)
    setSoftwareCurrentPage(1)
  }, [gameSearchQuery, softwareSearchQuery])

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.search-dropdown-container')) {
        setShowGameDropdown(false)
        setShowSoftwareDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex h-screen bg-zinc-950 relative">

      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-80 pl-350 z-0 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#79A7DD] to-[#415A77] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>


      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/src/assets/image.png"
          alt="Computer Background"
          className="w-[400px] h-auto object-contain opacity-100"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            if (!img.dataset.tried) {
              img.dataset.tried = 'true';
              img.src = '../../../imgs/pcgamermaior.png';
            }
          }}
        />
      </div>


      <div className="relative z-10 w-[420px] bg-zinc-950/90 shadow-lg h-full flex flex-col border-r border-zinc-800">
        <div className="p-6 border-b border-zinc-800 mt-20">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-zinc-100">Monte Seu PC</h1>
          </div>
          {!isUserLoggedIn && (
            <p className="text-xs text-zinc-500">
              Faça login para salvar suas configurações
            </p>
          )}
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto scroll-profile">
  
          <div className="space-y-2">
            <button
              className={`w-full px-4 py-3 rounded-lg text-left ${!showNotebooks && buildMode === 'manual'
                  ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                }`}
              onClick={() => {
                setBuildMode('manual')
                setShowNotebooks(false)
              }}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    className={!showNotebooks && buildMode === 'manual' ? 'stroke-black' : 'stroke-[url(#menuGradient)]'}
                  />
                  <defs>
                    <linearGradient id="menuGradient" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="#79A7DD" />
                      <stop offset="100%" stopColor="#a3c5ee" />
                    </linearGradient>
                  </defs>
                </svg>
                Montagem Manual
              </span>
            </button>
            <button
              className={`w-full px-4 py-3 rounded-lg text-left ${!showNotebooks && buildMode === 'automatic'
                  ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                }`}
              onClick={() => {
                setBuildMode('automatic')
                setShowNotebooks(false)
              }}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    className={!showNotebooks && buildMode === 'automatic' ? 'stroke-black' : 'stroke-[url(#menuGradient)]'}
                  />
                </svg>
                Recomendação por Software
              </span>
            </button>
            <button
              className={`w-full px-4 py-3 rounded-lg text-left ${showNotebooks
                  ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                }`}
              onClick={() => setShowNotebooks(!showNotebooks)}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    className={showNotebooks ? 'stroke-black' : 'stroke-[url(#menuGradient)]'}
                  />
                </svg>
                Notebooks
              </span>
            </button>

            <button
              className={`w-full px-4 py-3 rounded-lg text-left ${showPrices
                  ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                }`}
              onClick={() => setShowPrices(!showPrices)}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v8m0 0v8m0-8h8m-16 0h8"
                    className={showPrices ? 'stroke-black' : 'stroke-[url(#menuGradient)]'}
                  />
                </svg>
                Preços
              </span>
            </button>
            

            <div className="border-t border-zinc-700 my-4"></div>
            
 
            <button
              className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                !isUserLoggedIn
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : Object.keys(selectedParts).length === 0
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
              onClick={saveCurrentConfiguration}
              disabled={isUserLoggedIn && Object.keys(selectedParts).length === 0}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                {!isUserLoggedIn ? 'Faça Login para Salvar' : 'Adicionar à Lista'}
                {isUserLoggedIn && Object.keys(selectedParts).length === 0 && (
                  <span className="ml-2 text-xs">(Selecione peças)</span>
                )}
              </span>
            </button>
            
            <button
              className={`w-full px-4 py-3 rounded-lg text-left ${showSavedList
                  ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                }`}
              onClick={() => {
                if (!isUserLoggedIn) {
                  setShowLoginPrompt(true)
                  return
                }
                setShowSavedList(!showSavedList)
              }}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {isUserLoggedIn ? `Ver Lista (${savedConfigurations.length})` : 'Ver Lista (Faça Login)'}
              </span>
            </button>
          </div>


          {!showNotebooks && buildMode === 'automatic' && (
            <div className="space-y-4">
 
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Tipo de Configuração</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setRecommendationType('games')
                      setSelectedGame(null)
                      setSelectedSoftware(null)
                      setSelectedParts({})
                    }}
                    className={`
                      relative px-6 py-3 rounded-lg font-medium transition-all duration-150 transform hover:scale-105 
                      active:scale-95 active:text-black active:shadow-inner select-none
                      ${recommendationType === 'games'
                        ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-white shadow-lg shadow-[#79A7DD]/30'
                        : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:text-zinc-100'
                      }
                    `}
                    onMouseDown={(e) => {
                      e.currentTarget.style.color = 'black';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.color = '';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <div className="flex items-center space-x-2 pointer-events-none">
                      <span>Jogos</span>
                    </div>
                    {recommendationType === 'games' && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] opacity-20 animate-pulse pointer-events-none"></div>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setRecommendationType('software')
                      setSelectedGame(null)
                      setSelectedSoftware(null)
                      setSelectedParts({})
                    }}
                    className={`
                      relative px-6 py-3 rounded-lg font-medium transition-all duration-150 transform hover:scale-105 
                      active:scale-95 active:text-black active:shadow-inner select-none
                      ${recommendationType === 'software'
                        ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-white shadow-lg shadow-[#79A7DD]/30'
                        : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:text-zinc-100'
                      }
                    `}
                    onMouseDown={(e) => {
                      e.currentTarget.style.color = 'black';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.color = '';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Software Profissional</span>
                    </div>
                    {recommendationType === 'software' && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] opacity-20 animate-pulse"></div>
                    )}
                  </button>
                </div>
              </div>


              {recommendationType === 'games' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700">Selecione um Jogo</h3>


                  <div className="relative search-dropdown-container">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Pesquisar jogos..."
                        value={gameSearchQuery}
                        onChange={(e) => {
                          setGameSearchQuery(e.target.value)
                          setShowGameDropdown(e.target.value.length > 0)
                        }}
                        onFocus={() => setShowGameDropdown(gameSearchQuery.length > 0)}
                        className="w-full p-3 pl-10 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#79A7DD] text-zinc-100 placeholder-zinc-400"
                      />
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>


                    {showGameDropdown && filteredGames.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg max-h-60 overflow-y-auto scroll-profile">
                        {filteredGames.slice(0, 5).map(game => (
                          <button
                            key={game.id}
                            onClick={() => {
                              handleGameSelection(game)
                              setGameSearchQuery(game.name)
                              setShowGameDropdown(false)
                            }}
                            className="w-full p-3 text-left hover:bg-zinc-800 border-b border-zinc-800 last:border-b-0 flex items-center space-x-3"
                          >
                            <div className="w-12 h-7 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={game.image}
                                alt={game.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/48x28/404040/ffffff?text=Game'
                                }}
                              />
                            </div>
                            <div>
                              <div className="text-zinc-100 font-medium">{game.name}</div>
                              <div className="text-xs text-zinc-400">
                                CPU {game.requirements.cpu}% • GPU {game.requirements.gpu}% • RAM {game.requirements.ram}GB
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentGameItems.map(game => (
                      <button
                        key={game.id}
                        onClick={() => handleGameSelection(game)}
                        className={`
                          relative p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105
                          ${selectedGame?.id === game.id
                            ? 'border-[#79A7DD] bg-gradient-to-r from-[#79A7DD]/20 to-[#a3c5ee]/20 shadow-lg shadow-[#79A7DD]/30'
                            : 'border-zinc-700 bg-zinc-800 hover:border-[#79A7DD]/50'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-9 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={game.image}
                              alt={game.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/64x36/404040/ffffff?text=Game'
                              }}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className={`font-medium ${selectedGame?.id === game.id ? 'text-[#79A7DD]' : 'text-zinc-100'}`}>
                              {game.name}
                            </h4>
                            <p className="text-xs text-zinc-400">
                              CPU {game.requirements.cpu}% • GPU {game.requirements.gpu}% • RAM {game.requirements.ram}GB
                            </p>
                          </div>
                        </div>
                        {selectedGame?.id === game.id && (
                          <div className="absolute top-2 right-2">
                            <div className="w-3 h-3 rounded-full bg-[#79A7DD]"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>


                  {totalGamePages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-4">
                      <button
                        onClick={() => setGameCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={gameCurrentPage === 1}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${gameCurrentPage === 1 
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                            : 'bg-zinc-700 text-zinc-200 hover:bg-[#79A7DD] hover:text-white'
                          }
                        `}
                      >
                        ←
                      </button>
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: totalGamePages }, (_, i) => i + 1).map(pageNum => (
                          <button
                            key={pageNum}
                            onClick={() => setGameCurrentPage(pageNum)}
                            className={`
                              px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                              ${pageNum === gameCurrentPage
                                ? 'bg-[#79A7DD] text-white shadow-lg shadow-[#79A7DD]/30'
                                : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
                              }
                            `}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setGameCurrentPage(prev => Math.min(prev + 1, totalGamePages))}
                        disabled={gameCurrentPage === totalGamePages}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${gameCurrentPage === totalGamePages 
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                            : 'bg-zinc-700 text-zinc-200 hover:bg-[#79A7DD] hover:text-white'
                          }
                        `}
                      >
                        →
                      </button>
                    </div>
                  )}


                  <div className="text-center text-sm text-zinc-400 mt-2">
                    Mostrando {currentGameItems.length} de {filteredGames.length} jogos
                    {gameSearchQuery && ` (filtrado por "${gameSearchQuery}")`}
                  </div>

                  {selectedGame && (
                    <div className="mt-2 p-3 bg-blue-900/30 rounded-lg border border-blue-700/30">
                      <p className="text-sm text-blue-200">
                        <strong>{selectedGame.name}</strong><br />
                        Requisitos: CPU {selectedGame.requirements.cpu}%, GPU {selectedGame.requirements.gpu}%, RAM {selectedGame.requirements.ram}GB
                      </p>
                    </div>
                  )}
                </div>
              )}


              {recommendationType === 'software' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700">Selecione um Software</h3>


                  <div className="relative search-dropdown-container">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Pesquisar software..."
                        value={softwareSearchQuery}
                        onChange={(e) => {
                          setSoftwareSearchQuery(e.target.value)
                          setShowSoftwareDropdown(e.target.value.length > 0)
                        }}
                        onFocus={() => setShowSoftwareDropdown(softwareSearchQuery.length > 0)}
                        className="w-full p-3 pl-10 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#79A7DD] text-zinc-100 placeholder-zinc-400"
                      />
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    {showSoftwareDropdown && filteredSoftware.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg max-h-60 overflow-y-auto scroll-profile">
                        {filteredSoftware.slice(0, 5).map(software => (
                          <button
                            key={software.id}
                            onClick={() => {
                              handleSoftwareSelection(software.id)
                              setSoftwareSearchQuery(software.name)
                              setShowSoftwareDropdown(false)
                            }}
                            className="w-full p-3 text-left hover:bg-zinc-800 border-b border-zinc-800 last:border-b-0 flex items-center space-x-3"
                          >
                            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-white p-1">
                              <img
                                src={software.image}
                                alt={software.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/40x40/404040/ffffff?text=SW'
                                }}
                              />
                            </div>
                            <div>
                              <div className="text-zinc-100 font-medium">{software.name}</div>
                              <div className="text-xs text-zinc-400 capitalize">
                                {software.category} • CPU {software.requirements.cpu}% • GPU {software.requirements.gpu}%
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentSoftwareItems.map(software => (
                      <button
                        key={software.id}
                        onClick={() => handleSoftwareSelection(software.id)}
                        className={`
                          relative p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105
                          ${selectedSoftware?.id === software.id
                            ? 'border-[#79A7DD] bg-gradient-to-r from-[#79A7DD]/20 to-[#a3c5ee]/20 shadow-lg shadow-[#79A7DD]/30'
                            : 'border-zinc-700 bg-zinc-800 hover:border-[#79A7DD]/50'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-white p-1">
                            <img
                              src={software.image}
                              alt={software.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/48x48/404040/ffffff?text=SW'
                              }}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className={`font-medium ${selectedSoftware?.id === software.id ? 'text-[#79A7DD]' : 'text-zinc-100'}`}>
                              {software.name}
                            </h4>
                            <p className="text-xs text-zinc-400 capitalize">
                              {software.category} • CPU {software.requirements.cpu}% • GPU {software.requirements.gpu}%
                            </p>
                          </div>
                        </div>
                        {selectedSoftware?.id === software.id && (
                          <div className="absolute top-2 right-2">
                            <div className="w-3 h-3 rounded-full bg-[#79A7DD]"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {totalSoftwarePages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-4">
                      <button
                        onClick={() => setSoftwareCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={softwareCurrentPage === 1}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${softwareCurrentPage === 1 
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                            : 'bg-zinc-700 text-zinc-200 hover:bg-[#79A7DD] hover:text-white'
                          }
                        `}
                      >
                        ←
                      </button>
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: totalSoftwarePages }, (_, i) => i + 1).map(pageNum => (
                          <button
                            key={pageNum}
                            onClick={() => setSoftwareCurrentPage(pageNum)}
                            className={`
                              px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                              ${pageNum === softwareCurrentPage
                                ? 'bg-[#79A7DD] text-white shadow-lg shadow-[#79A7DD]/30'
                                : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
                              }
                            `}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setSoftwareCurrentPage(prev => Math.min(prev + 1, totalSoftwarePages))}
                        disabled={softwareCurrentPage === totalSoftwarePages}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${softwareCurrentPage === totalSoftwarePages 
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                            : 'bg-zinc-700 text-zinc-200 hover:bg-[#79A7DD] hover:text-white'
                          }
                        `}
                      >
                        →
                      </button>
                    </div>
                  )}

                  <div className="text-center text-sm text-zinc-400 mt-2">
                    Mostrando {currentSoftwareItems.length} de {filteredSoftware.length} softwares
                    {softwareSearchQuery && ` (filtrado por "${softwareSearchQuery}")`}
                  </div>

                  {selectedSoftware && (
                    <div className="mt-2 p-3 bg-green-900/30 rounded-lg border border-green-700/30">
                      <p className="text-sm text-green-200">
                        <strong>{selectedSoftware.name}</strong> - {'category' in selectedSoftware ? selectedSoftware.category : 'Jogo'}<br />
                        Requisitos: CPU {selectedSoftware.requirements.cpu}%, GPU {selectedSoftware.requirements.gpu}%, RAM {selectedSoftware.requirements.ram}GB
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!showNotebooks && (selectedGame || selectedSoftware) && (
            <div className="mb-4">
              <button
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black font-semibold hover:shadow-lg hover:shadow-[#79A7DD]/30 transition-all"
                onClick={() => setShowRecommendations(true)}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Ver Recomendações para {selectedGame?.name || selectedSoftware?.name}
                </span>
              </button>
            </div>
          )}

          {!showNotebooks && Object.keys(selectedParts).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-100">Resumo do Orçamento</h3>
              <div className="space-y-2">
                {Object.entries(selectedParts).map(([type, part]) => (
                  <div key={type} className="flex justify-between py-2 border-b border-zinc-800 text-sm">
                    <span className="font-medium text-zinc-300">{getPartNameInPortuguese(type)}</span>
                    <span className="text-zinc-300">R$ {part.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 font-bold">
                  <span className="text-zinc-100">Total:</span>
                  <span className="text-[#79A7DD]">
                    R$ {calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {showNotebooks ? (
              <div className="space-y-4">
                {notebooks.map(notebook => (
                  <div key={notebook.id} className="bg-zinc-900 rounded-lg shadow-lg p-4 hover:shadow-[#79A7DD]/20 transition-shadow border border-zinc-800">
                    <div className="rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={notebook.image} 
                        alt={notebook.name} 
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/imgs/laptop.png';
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-zinc-100">{notebook.name}</h3>
                    <div className="space-y-1 mb-3 text-sm text-zinc-300">
                      <p><span className="font-semibold text-zinc-200">CPU:</span> {notebook.specs.cpu}</p>
                      <p><span className="font-semibold text-zinc-200">GPU:</span> {notebook.specs.gpu}</p>
                      <p><span className="font-semibold text-zinc-200">RAM:</span> {notebook.specs.ram}</p>
                      <p><span className="font-semibold text-zinc-200">Armazenamento:</span> {notebook.specs.storage}</p>
                    </div>
                    <p className="text-xl font-bold bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] bg-clip-text text-transparent">
                      R$ {notebook.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : buildMode === 'manual' ? (
              <div className="space-y-4">
                {['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu', 'case'].map(type => (
                  <div key={type} className="bg-zinc-900 rounded-lg shadow-lg p-4 hover:shadow-[#79A7DD]/20 transition-shadow border border-zinc-800">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-lg bg-black mr-3">
                        {getPartIcon(type)}
                      </div>
                      <h3 className="text-base font-bold text-zinc-100">{getPartNameInPortuguese(type)}</h3>
                    </div>
                    
                    <div className="relative component-search-container">
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full pl-10 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#79A7DD] focus:border-[#79A7DD] text-zinc-100 text-sm"
                          placeholder={`Pesquisar ${getPartNameInPortuguese(type).toLowerCase()}...`}
                          value={componentSearchQueries[type] || (selectedParts[type]?.name || '')}
                          onChange={(e) => handleComponentSearch(type, e.target.value)}
                          onFocus={() => handleComponentFocus(type)}
                        />
                        <svg
                          className="absolute left-3 top-3 w-4 h-4 text-zinc-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        {(componentSearchQueries[type] || selectedParts[type]) && (
                          <button
                            onClick={() => clearComponentSearch(type)}
                            className="absolute right-3 top-3 w-4 h-4 text-zinc-500 hover:text-zinc-300 transition-colors"
                          >
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>

  
                      {showComponentDropdowns[type] && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl max-h-64 overflow-y-auto scroll-profile">
                          {getFilteredComponents(type).length > 0 ? (
                            getFilteredComponents(type).map(part => (
                              <button
                                key={part.id}
                                onClick={() => handleComponentSelection(part, type)}
                                className="w-full px-4 py-3 text-left hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-zinc-100 font-medium text-sm">{part.name}</p>
                                    <p className="text-zinc-400 text-xs">Performance: {part.performance}%</p>
                                  </div>
                                  <p className="text-[#79A7DD] font-semibold text-sm">
                                    R$ {part.price.toLocaleString()}
                                  </p>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-zinc-500 text-sm">
                              Nenhum componente encontrado
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {selectedParts[type] && (
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] bg-clip-text text-transparent font-medium">
                          Performance: {selectedParts[type].performance}%
                        </p>
                        <p className="text-sm text-zinc-400">
                          R$ {selectedParts[type].price.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-zinc-900 rounded-lg shadow-lg p-4 border border-zinc-800">
                {(selectedGame || selectedSoftware) ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-zinc-100">
                        Configuração para {selectedGame ? selectedGame.name : selectedSoftware?.name}
                        {selectedSoftware && (
                          <span className="text-sm font-normal text-zinc-400 ml-2">
                            ({'category' in selectedSoftware ? selectedSoftware.category : 'Jogo'})
                          </span>
                        )}
                      </h2>
                      <button
                        onClick={() => setShowPartsDetail(true)}
                        className="px-4 py-2 bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-white rounded-lg font-medium text-sm hover:scale-105 transition-transform duration-200 shadow-lg shadow-[#79A7DD]/30"
                      >
                        Ver Peças
                      </button>
                    </div>
                    {Object.entries(selectedParts).map(([type, part]) => (
                      <div key={type} className="bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-semibold text-zinc-100">{getPartNameInPortuguese(type)}</h3>
                          <p className="bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] bg-clip-text text-transparent font-medium text-sm">
                            R$ {part.price.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-zinc-300 mb-2">{part.name}</p>
                        <div className="h-1.5 bg-zinc-800 rounded-full">
                          <div
                            className="h-1.5 bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] rounded-full"
                            style={{ width: `${part.performance}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="bg-black rounded-lg p-3 inline-block mb-3">
                      <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          className="stroke-[url(#playGradient)]"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          className="stroke-[url(#playGradient)]"
                        />
                        <defs>
                          <linearGradient id="playGradient" x1="0" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stopColor="#79A7DD" />
                            <stop offset="100%" stopColor="#a3c5ee" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      Selecione um {recommendationType === 'games' ? 'jogo' : 'software'} acima para ver a configuração recomendada
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showPrices && (
        <div
          className="absolute right-8 top-40 w-[420px] bg-zinc-950/75 shadow-2xl h-[calc(100vh-12rem)] rounded-xl border border-zinc-800 backdrop-blur-xl transition-all duration-300 ease-out transform translate-x-0 opacity-100 z-30 flex flex-col"
          style={{
            transform: 'translateX(0)',
            opacity: 1,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          }}>
          <div className="flex-shrink-0 bg-zinc-950/75 p-4 lg:p-6 border-b border-zinc-800 space-y-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg lg:text-xl font-bold text-zinc-100">Catálogo de Preços</h2>
              <button
                onClick={() => setShowPrices(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Pesquisar componente..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#79A7DD] text-zinc-100 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    stroke="currentColor"
                  />
                </svg>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  showFilters 
                    ? 'bg-[#79A7DD] text-white' 
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
              </button>
            </div>

            {showFilters && (
              <div className="space-y-3 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Tipo de Componente</label>
                  <select
                    value={priceFilterType}
                    onChange={(e) => setPriceFilterType(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#79A7DD] text-zinc-100 text-sm"
                  >
                    <option value="all">Todos os tipos</option>
                    {availableTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Marca</label>
                  <select
                    value={priceFilterBrand}
                    onChange={(e) => setPriceFilterBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-[#79A7DD] text-zinc-100 text-sm"
                  >
                    <option value="all">Todas as marcas</option>
                    {availableBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Faixa de Preço: R$ {priceRangeMin} - R$ {priceRangeMax}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRangeMin}
                      onChange={(e) => setPriceRangeMin(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRangeMax}
                      onChange={(e) => setPriceRangeMax(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>R$ 0</span>
                      <span>R$ 5.000</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPriceFilterType('all')
                    setPriceFilterBrand('all')
                    setPriceRangeMin(0)
                    setPriceRangeMax(10000)
                    setSearchQuery('')
                  }}
                  className="w-full px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto min-h-0 scroll-profile">
            {filteredPrices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-400">Nenhum componente encontrado com os filtros aplicados.</p>
              </div>
            ) : (
              filteredPrices.map(part => (
                <div key={part.name} className="bg-white/5 rounded-lg p-4 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 animate-slideInFromRight">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 bg-zinc-950/50 rounded-lg p-2 backdrop-blur-md">
                      <img src={part.image} alt={part.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white/90">{part.name}</h3>
                      <p className="text-sm text-white/60">{part.type}</p>
                      <p className="text-xs text-white/50">{part.brand}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {part.prices.map(price => (
                      <div
                        key={price.store}
                        className="flex items-center justify-between p-3 bg-zinc-950/30 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-zinc-950/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <img src={price.logo} alt={price.store} className="w-6 h-6 rounded" />
                          <span className="text-white/80">{price.store}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-white/90">
                            R$ {price.price.toFixed(2)}
                          </span>
                          {price.availability ? (
                            <a
                              href={price.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 text-sm bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-white rounded-lg transition-colors hover:from-[#6b96cc] hover:to-[#92b8dd]"
                            >
                              Ver oferta
                            </a>
                          ) : (
                            <span className="px-3 py-1 text-sm bg-zinc-900/50 text-zinc-500 rounded-lg">
                              Indisponível
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex-1 bg-zinc-950"></div>

      {showSavedList && isUserLoggedIn && (
        <div
          className="absolute right-8 top-40 w-[420px] bg-zinc-950/75 shadow-2xl h-[calc(100vh-12rem)] rounded-xl overflow-hidden border border-zinc-800 backdrop-blur-xl transition-all duration-300 ease-out transform translate-x-0 opacity-100 z-30"
          style={{
            transform: 'translateX(0)',
            opacity: 1,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          }}>
          <div className="sticky top-0 bg-zinc-950/75 p-6 border-b border-zinc-800 space-y-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-100">Configurações Salvas</h2>
              <button
                onClick={() => setShowSavedList(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto scroll-profile h-full pb-24">
            {savedConfigurations.length > 0 ? (
              <div className="space-y-4">
                {savedConfigurations.map((config) => (
                  <div key={config.id} className="group">
                    <div className="bg-zinc-950/50 backdrop-blur-sm rounded-xl border border-zinc-800/30 p-4 hover:border-zinc-700/50 transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-zinc-100 text-lg mb-2 group-hover:text-[#79A7DD] transition-colors">
                            {config.name}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2 py-1 bg-[#79A7DD]/20 text-[#79A7DD] text-xs font-semibold rounded-full">
                              {Object.keys(config.parts).length} peças
                            </span>
                            {config.targetGame && (
                              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                                Jogo: {config.targetGame.name}
                              </span>
                            )}
                            {config.targetSoftware && (
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">
                                Software: {config.targetSoftware.name}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400 mb-3">
                            Criado em: {config.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-2xl font-bold bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] bg-clip-text text-transparent">
                            R$ {config.totalPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => loadConfiguration(config)}
                            className="px-3 py-1 bg-[#79A7DD] text-white rounded-lg hover:bg-[#6b94c7] transition-colors text-sm font-medium"
                          >
                            Carregar
                          </button>
                          <button
                            onClick={() => deleteConfiguration(config.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-zinc-300 mb-2">Nenhuma configuração salva</h4>
                <p className="text-sm text-zinc-500">Monte uma configuração e clique em "Adicionar à Lista" para salvar</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-zinc-800/50 shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-zinc-100">
                Login Necessário
              </h3>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#79A7DD]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#79A7DD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-zinc-100 mb-2">
                Faça login para salvar suas configurações
              </h4>
              <p className="text-sm text-zinc-400 mb-4">
                Crie uma conta gratuita ou faça login para salvar e gerenciar suas configurações de PC personalizadas.
              </p>
              <div className="bg-zinc-800/50 rounded-lg p-3 mb-4">
                <h5 className="text-sm font-semibold text-zinc-200 mb-2">Benefícios da conta:</h5>
                <ul className="text-xs text-zinc-400 space-y-1 text-left">
                  <li>• Salve configurações ilimitadas</li>
                  <li>• Acesse de qualquer dispositivo</li>
                  <li>• Compare diferentes builds</li>
                  <li>• Receba alertas de preços</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full px-4 py-3 bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-white rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg shadow-[#79A7DD]/30 font-medium text-center block"
              >
                Fazer Login
              </Link>
              <Link
                to="/register"
                className="w-full px-4 py-3 bg-zinc-700 text-zinc-200 rounded-lg hover:bg-zinc-600 transition-colors font-medium text-center block"
              >
                Criar Conta Gratuita
              </Link>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full px-4 py-2 text-zinc-400 hover:text-zinc-300 transition-colors text-sm"
              >
                Continuar sem salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPartsDetail && (
        <div
          className="absolute right-8 top-40 w-[420px] bg-zinc-950/75 shadow-2xl h-[calc(100vh-12rem)] rounded-xl overflow-hidden border border-zinc-800 backdrop-blur-xl transition-all duration-300 ease-out transform translate-x-0 opacity-100 z-30"
          style={{
            transform: 'translateX(0)',
            opacity: 1,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          }}>
          <div className="sticky top-0 bg-zinc-950/75 p-6 border-b border-zinc-800 space-y-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-100">Peças da Configuração</h2>
              <button
                onClick={() => setShowPartsDetail(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto scroll-profile h-full pb-24">
            {Object.keys(selectedParts).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(selectedParts).map(([type, part]) => (
                  <div key={type} className="group">
                    <div className="bg-zinc-950/50 backdrop-blur-sm rounded-xl border border-zinc-800/30 p-4 hover:border-zinc-700/50 transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="px-2 py-1 bg-[#79A7DD]/20 text-[#79A7DD] text-xs font-semibold rounded-full">
                              {getPartNameInPortuguese(type)}
                            </span>
                          </div>
                          <h3 className="font-semibold text-zinc-100 text-sm mb-2 group-hover:text-[#79A7DD] transition-colors">
                            {part.name}
                          </h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-xs text-zinc-400">Performance:</span>
                            <div className="h-1.5 bg-zinc-800 rounded-full w-20">
                              <div 
                                className="h-1.5 bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] rounded-full transition-all duration-300"
                                style={{ width: `${part.performance}%` }}
                              />
                            </div>
                            <span className="text-xs text-zinc-300 font-medium">{part.performance}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] bg-clip-text text-transparent">
                            R$ {part.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="sticky bottom-0 bg-zinc-950/75 backdrop-blur-xl border-t border-zinc-800/50 p-4 rounded-xl">
                  <div className="bg-gradient-to-r from-[#79A7DD]/20 to-[#a3c5ee]/20 rounded-lg p-4 border border-[#79A7DD]/30">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-bold text-zinc-100">Total</h4>
                      <p className="text-2xl font-bold bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] bg-clip-text text-transparent">
                        R$ {calculateTotal().toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-zinc-400">
                      {Object.keys(selectedParts).length} peças selecionadas
                    </p>
                    <div className="mt-3 space-y-2">
                      <button
                        onClick={() => {
                          setShowPartsDetail(false)
                          setShowPrices(true)
                        }}
                        className="w-full px-4 py-2 bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-white rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg shadow-[#79A7DD]/30 font-medium"
                      >
                        Ver Preços Detalhados
                      </button>
                      <button
                        onClick={() => setShowPartsDetail(false)}
                        className="w-full px-4 py-2 bg-zinc-700 text-zinc-200 rounded-lg hover:bg-zinc-600 transition-colors font-medium"
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-zinc-300 mb-2">Nenhuma peça selecionada</h4>
                <p className="text-sm text-zinc-500">Selecione um jogo ou software para ver as peças recomendadas</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showRecommendations && (selectedGame || selectedSoftware) && (
        <div
          className="absolute right-8 top-40 w-[500px] bg-zinc-950/75 shadow-2xl h-[calc(100vh-12rem)] rounded-xl overflow-hidden border border-zinc-800 backdrop-blur-xl transition-all duration-300 ease-out transform translate-x-0 opacity-100 z-30 flex flex-col"
          style={{
            transform: 'translateX(0)',
            opacity: 1,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          }}>
          <div className="sticky top-0 bg-zinc-950/75 p-6 border-b border-zinc-800 space-y-4 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-100">
                Recomendações para {selectedGame?.name || selectedSoftware?.name}
              </h2>
              <button
                onClick={() => setShowRecommendations(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  recommendationTab === 'algorithm'
                    ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
                onClick={() => setRecommendationTab('algorithm')}
              >
                Algoritmo
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  recommendationTab === 'community'
                    ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
                onClick={() => setRecommendationTab('community')}
              >
                Comunidade
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  recommendationTab === 'notebooks'
                    ? 'bg-gradient-to-r from-[#79A7DD] to-[#a3c5ee] text-black'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
                onClick={() => setRecommendationTab('notebooks')}
              >
                Notebooks
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scroll-profile p-6">
            {recommendationTab === 'algorithm' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-zinc-100 mb-4">Builds Recomendadas</h3>
                {recommendedBuilds.map(build => (
                  <div key={build.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                    <h4 className="text-lg font-medium text-zinc-100 mb-2">{build.name}</h4>
                    <p className="text-sm text-zinc-400 mb-3">{build.performance}</p>
                    <div className="space-y-1 text-xs text-zinc-300 mb-3">
                      <p><span className="font-semibold">CPU:</span> {build.components.cpu}</p>
                      <p><span className="font-semibold">GPU:</span> {build.components.gpu}</p>
                      <p><span className="font-semibold">RAM:</span> {build.components.ram}</p>
                      <p><span className="font-semibold">Storage:</span> {build.components.storage}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#79A7DD]">
                        R$ {build.totalPrice.toLocaleString()}
                      </span>
                      <button className="px-3 py-1 bg-[#79A7DD] text-black text-xs font-medium rounded hover:bg-[#a3c5ee] transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {recommendationTab === 'community' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-zinc-100 mb-4">Builds da Comunidade</h3>
                {communityBuilds.map(build => (
                  <div key={build.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-medium text-zinc-100">{build.name}</h4>
                        <div className="flex items-center mt-1">
                          <img 
                            src={build.user.avatar} 
                            alt={build.user.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-sm text-zinc-400">por {build.user.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-zinc-400">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span className="text-sm">{build.likes}</span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">{build.performance}</p>
                    <div className="space-y-1 text-xs text-zinc-300 mb-3">
                      <p><span className="font-semibold">CPU:</span> {build.components.cpu}</p>
                      <p><span className="font-semibold">GPU:</span> {build.components.gpu}</p>
                      <p><span className="font-semibold">RAM:</span> {build.components.ram}</p>
                      <p><span className="font-semibold">Storage:</span> {build.components.storage}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#79A7DD]">
                        R$ {build.totalPrice.toLocaleString()}
                      </span>
                      <button className="px-3 py-1 bg-[#79A7DD] text-black text-xs font-medium rounded hover:bg-[#a3c5ee] transition-colors">
                        Copiar Build
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {recommendationTab === 'notebooks' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-zinc-100 mb-4">Notebooks Recomendados</h3>
                {notebooks.map(notebook => (
                  <div key={notebook.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                    <div className="flex space-x-4">
                      <img 
                        src={notebook.image} 
                        alt={notebook.name}
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-zinc-100 mb-1">{notebook.name}</h4>
                        <div className="space-y-1 text-xs text-zinc-300 mb-2">
                          <p><span className="font-semibold">CPU:</span> {notebook.specs.cpu}</p>
                          <p><span className="font-semibold">GPU:</span> {notebook.specs.gpu}</p>
                          <p><span className="font-semibold">RAM:</span> {notebook.specs.ram}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-[#79A7DD]">
                            R$ {notebook.price.toLocaleString()}
                          </span>
                          <button className="px-3 py-1 bg-[#79A7DD] text-black text-xs font-medium rounded hover:bg-[#a3c5ee] transition-colors">
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-slideInFromRight {
          animation: slideInFromRight 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

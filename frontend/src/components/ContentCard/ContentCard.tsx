import { ChevronRightIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

type contentList = {
    title: string;
    type: string;
    difficulty: string;
}

interface ContentCardProps {
    title: string;
    nameButton: string;
    contentList: contentList[];
}

function ContentCard({title, nameButton, contentList}: ContentCardProps) {

    return (
        <>
            <div className="w-full">
                <h1 className="text-white text-2xl font-semibold flex items-center">
                    <AcademicCapIcon className="w-5 h-5 mr-2 text-green-400" />
                    {title}
                </h1>
                <div className="space-y-4 mt-2">
                    {contentList.map((content, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-green-400 font-medium">{content.type}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${content.difficulty === 'Iniciante' ? 'bg-green-500/20 text-green-400' :
                                    content.difficulty === 'Intermediário' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                    {content.difficulty}
                                </span>
                            </div>
                            <h3 className="text-white font-medium group-hover:text-green-300 transition-colors">
                                {content.title}
                            </h3>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-4 text-green-400 hover:text-green-300 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                    {nameButton}
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </>
    )
}

export default ContentCard
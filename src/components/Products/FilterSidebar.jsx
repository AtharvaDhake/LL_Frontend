
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState("");

    const [filters, setFilters] = useState({
        skills: [],
        ages: [],
        activities: [],
    });

    const [openSections, setOpenSections] = useState({
        skills: true,
        ages: true,
        activities: true,
    });

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        setFilters({
            skills: params.skill ? params.skill.split(",") : [], 
            ages: params.age ? params.age.split(",") : [],
            activities: params.activity ? params.activity.split(",") : [],
        });

    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };

        if (type === "checkbox") {
             const existing = newFilters[name] || [];
            if (checked) {
                newFilters[name] = [...existing, value];
            } else {
                newFilters[name] = existing.filter((item) => item !== value);
            }
        } 

        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        
        // Arrays 
        if (newFilters.skills.length > 0) params.append("skill", newFilters.skills.join(","));
        if (newFilters.ages.length > 0) params.append("age", newFilters.ages.join(","));
        if (newFilters.activities.length > 0) params.append("activity", newFilters.activities.join(","));

        setSearchParams(params);
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const skillsList = [
        "Cognitive Development",
        "Language & Literacy",
        "Numeracy & Counting",
        "Sensory & Visual Skills",
        "Fine Motor Skills",
    ];

    const agesList = [
        "Toddlers (2-4)",
        "Preschoolers (4-6)",
        "Early School-Age (6-8)",
    ];

    const activitiesList = [
        "Sorting & Placing",
        "Matching & Recognizing",
        "Tracing & Pre-Writing",
        "Lacing & Beading",
        "Puzzling & Patterning",
        "Counting & Stacking",
        "Spelling & Storytelling",
        "Sensory Touch & Feel",
        "Practical Life Skills",
        "Letter & Language Basics",
    ];

    const FilterSection = ({ title, name, options, isOpen, onToggle }) => {
        // Filter options based on search term
        const filteredOptions = options.filter(option => 
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="mb-6 border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <button 
                    onClick={onToggle}
                    className="flex justify-between items-center w-full text-left group"
                    aria-expanded={isOpen}
                    aria-controls={`filter-section-${name}`}
                >
                    <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{title}</span>
                    <span className={`text-gray-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                         <FaChevronDown />
                    </span>
                </button>
                
                <div 
                    id={`filter-section-${name}`}
                    className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <label key={option} className="flex items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors -mx-2">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`${name}-${option}`}
                                        name={name}
                                        value={option}
                                        onChange={handleFilterChange}
                                        checked={filters[name].includes(option)}
                                        className="peer h-4 w-4 border-2 border-gray-300 rounded text-primary focus:ring-primary/25 cursor-pointer transition-colors checked:border-primary checked:bg-primary"
                                    />
                                </div>
                                <span 
                                    className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 flex-1 select-none font-medium"
                                >
                                    {option}
                                </span>
                            </label>
                        ))
                    ) : (
                        <p className="text-xs text-gray-400 italic px-2">No matches found</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide">
            
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Filter By</h3>
                {(filters.skills.length > 0 || filters.ages.length > 0 || filters.activities.length > 0) && (
                    <button
                        onClick={() => {
                            setFilters({ skills: [], ages: [], activities: [] });
                            setSearchParams(new URLSearchParams());
                        }}
                        className="text-xs text-primary hover:text-red-700 font-semibold underline transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Global Search for Filter Options */}
            <div className="relative mb-6">
                <input 
                    type="text" 
                    placeholder="Search filters..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-600 bg-gray-50 placeholder-gray-400 transition"
                    aria-label="Search filters"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            </div>

            <div className="space-y-1 pr-1">
                <FilterSection 
                    title="Skills" 
                    name="skills" 
                    options={skillsList} 
                    isOpen={openSections.skills}
                    onToggle={() => toggleSection('skills')}
                />
                
                <FilterSection 
                    title="Ages" 
                    name="ages" 
                    options={agesList} 
                    isOpen={openSections.ages}
                    onToggle={() => toggleSection('ages')}
                />
                
                <FilterSection 
                    title="Activities" 
                    name="activities" 
                    options={activitiesList} 
                    isOpen={openSections.activities}
                    onToggle={() => toggleSection('activities')}
                />
            </div>
        </div>
    );
};

export default FilterSidebar;

import { useContext, useEffect } from "react";
import { HomeContext } from "../context/HomeContext";

import { FlexDiv } from "../styles/globalStyleComponent";

export const Home = ()=>{
    const homeContext = useContext(HomeContext);

    useEffect(()=>{
        homeContext.setUser({
            bio:{
                name:'Anil'
            },
            experience:[{
                    company:'Goma IT Solution'
                },
                {
                    company:'ACE Constructors'
                }
            ],
            skills:[{
                    skillType:'Front-end'
                },
                {
                    skillType:'Backend-end'
                }
            ]
        })
        
    },[])

    return(
        <>
            <FlexDiv>
                <FlexDiv>
                    Name:{homeContext?.user?.bio.name}
                </FlexDiv>
                <>
                    {
                        homeContext?.user?.experience.map(exp=>{
                            return(
                                <FlexDiv key={exp.company}> Company:{exp.company} </FlexDiv>
                            )
                        })
                    }
                </>
                <>
                    {
                        homeContext?.user?.skills.map(skill=>{
                            return(
                                <FlexDiv key={skill.skillType}> skill:{skill.skillType} </FlexDiv>
                            )
                        })
                    }
                </>
            </FlexDiv>
        </>
    )
}
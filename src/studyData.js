//@ts-check

import {json} from 'd3-fetch'

import './types.js'

/**
 * @param {any} data
 * @returns {data is StudyEnvironment}
 */
function isStudyEnvironment(data){
    return Object(data) === data &&
        Array.isArray(data.brief) &&
        Object(data.impacts) === data.impacts // vérification faible. PPP : à améliorer
}


/**
 * @param {any} data
 * @returns {data is Study}
 */
function isStudy(data){
    return Object(data) === data &&
        typeof data.country === 'string' &&
        typeof data.product === 'string' &&
        Number.isFinite(data.year) && data.year >= 2000 &&
        isStudyEnvironment(data.environment)
}


/**
 * 
 * @param {StudyId} studyId 
 * @returns {Promise<Study>}
 */
export default function getStudyData(studyId){
    return json(`../data/${studyId}.json`)
        .then(data => {
            if(isStudy(data))
                return data;
            else{
                throw new TypeError(`Données de l'étude ${studyId} mal formée`)
            }
        })
}

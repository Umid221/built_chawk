import { useEffect, useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewForm from "@components/common/form/review-form";

interface Props {
	data: any;
	locale?: string;
	productId?: string | number | undefined;
	setAddonsProduct: any;
}

const ProductAddons: React.FC<Props> = ({ data, locale, productId, setAddonsProduct }) => {
	const [expanded, setExpanded] = useState<number>(0);
	const [addons, setAddons] = useState<any>(data);

	useEffect(() => {
		setAddons(addons.map((addon:any) => {
			return {...addon, checked:false, chosenModifiers:[], modifiers: addon.modifiers.map((modifier:any) =>{
				return {...modifier, chosenTags:[]}
			})}
		}))
	}, [])

	function handleAddon(e:any, id:string) {
		setAddons(addons.map((addon:any) => {
			// addon.modifiers?.length>0 ? addon.modifiers.forEach((modifier:any) => modifier.checked = modifier.id)
			if (addon.id === id) {
				// if (e && addon.modifiers?.length>0){
				// 	addon.modifiers[0].checked = addon.modifiers[0].id;
				// }
				return {...addon, checked:e}
			}
			return addon
		}))		
	}

	function handleModifier(e:any, id:string, addonId:string) {
		setAddons(addons.map((addon:any) => {
			if (addon.id === addonId) {
				if (e){
					addon.chosenModifiers.push(id)
				}else {
					addon.chosenModifiers.splice(addon.chosenModifiers.indexOf(id), 1)
				}
			}
			return addon
		}))
		setAddonsProduct(addons)
	}

	function handleTags(e:boolean, tagId:string, modId:string, addonId:string){
		setAddons(addons.map((addon:any) => {
			if (addon.id === addonId) {
				if (e){
					addon.modifiers.map((modifier:any) => {
						modifier.chosenTags.push(tagId)
					})
				}else {
					addon.modifiers.map((modifier:any) => {
						modifier.chosenTags.splice(modifier.chosenTags.indexOf(tagId), 1)
					})
				}
			}
			return addon
		}))
		setAddonsProduct(addons)
	}

	// <div className="flex items-start">
	// 	<div className="flex items-center h-5">
	// 		<input onChange={e=>handleAddon(e.target.checked, item.id)} checked={item?.checked} id={`comments${item.id}`} name="comments" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
	// 	</div>
	// 	<div className="mx-3 text-sm">
	// 		<label htmlFor={`comments${item.id}`} className="font-medium text-gray-700">
	// 			<span className="text-red-500">{item?.required && '*'}</span>&nbsp;
	// 			{locale==='en'?item.nameEng:item.nameAr}
	// 		</label>
	// 		{/* <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p> */}
	// 	</div>
	// </div>

	return (
		<>
			<h3 className="font-bold text-black text-xl">Add ons</h3>
			{addons?.map((item: any, index: any) => (
				<div className="mt-4 space-y-4" key={item.id}>
					<div className="ml-2 relative">
						<span className={`absolute top-4 -left-3.5 text-red-500 ${!item?.required && 'invisible'}`}>*</span>
						<Collapse
							i={index}
							key={item.id}
							title={<div className="text-lg">{locale==='en'?item.nameEng:item.nameAr} <span className="text-gray-400 text-sm">
									{`(Choose ${item.minAllowed} as minimum up to ${item.maxAllowed} as maximum)`}
								</span></div>}
							translatorNS="review"
							content={<div className="mx-10">
								<div className="space-y-3">
									{
										item.modifiers.map((modifier:any) =>
										<div key={modifier.id}>
											<div className="flex items-start">
												<div className="flex items-center h-5">
													<input onChange={e=>handleModifier(e.target.checked, modifier.id, item.id)} checked={item.chosenModifiers?.includes(modifier.id)} id={`modifiers-${modifier.id}`} name="comments" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
												</div>
												<div className="mx-3 text-sm">
													<label htmlFor={`modifiers-${modifier.id}`} className="font-medium text-gray-700">
														{locale==='en'?modifier.nameEng:modifier.nameAr}
														<span className="mx-8">${modifier.price}</span>
													</label>
												</div>
											</div>
											{/* <hr className="color-black text-black-800"/> */}
											<div className="mx-10 mt-3 space-y-4">
												{item.chosenModifiers?.includes(modifier.id) && 
													modifier.modifierTags.length>0 && modifier.modifierTags.map((tag:any) => <div key={tag.id}>
														<div className="flex items-start">
															<div className="flex items-center h-5">
																<input onChange={e=>handleTags(e.target.checked, tag.id, modifier.id, item.id)} checked={modifier.chosenTags?.includes(tag.id)} id={`modifiers-${tag.id}`} name="comments" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
															</div>
															<div className="mx-3 text-sm">
																<label htmlFor={`modifiers-${tag.id}`} className="font-medium text-gray-700">
																	<span className="text-red-500">{tag?.required && '*'}</span>&nbsp;
																	{locale==='en'?tag.nameEng:tag.nameAr}
																</label>
															</div>
														</div>
													</div>)}
											</div>
										</div>
										)
									}
								</div>
							</div>}
							expanded={expanded}
							setExpanded={setExpanded}
							variant="transparent"
						/>
					</div>
				</div>
			))}
		</>
	);
};

export default ProductAddons;

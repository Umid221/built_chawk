import Container from "@components/ui/container";
import WidgetLink from "@components/widgets/widget-link";
import { useContactsQuery } from "@framework/footer/get-contact";
import { useSocialQuery } from "@framework/footer/get-social";

interface WidgetsProps {
	widgets: {
		id: number;
		widgetTitle: string;
		lists: any;
	}[];
}

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {


	const contacts = useContactsQuery()
	const social = useSocialQuery()
	// console.log(widgets[0].widgetTitle)

	return (
		<Container>
			<div className={`grid grid-cols-2 ${social?.data?.length>0 ? 'md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'} gap-5 md:gap-9 xl:gap-5  pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1`}>
				{widgets?.map((widget) => (
					<WidgetLink
						key={`footer-widget--key${widget.id}`}
						data={widget}
						className="pb-3 md:pb-0"
						contacts={contacts}
						social={widget?.widgetTitle==='widget-title-social' ? social : {data:[1,2,3]}}
					/>
				))}
			</div>
		</Container>
	);
};

export default Widgets;

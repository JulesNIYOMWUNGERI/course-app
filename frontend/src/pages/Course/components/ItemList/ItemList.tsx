import "./ItemList.css";
import type {BaseItem, ItemListProps} from "../../types.ts";



function ItemList<T extends BaseItem>({
    sectionTitle,
    items,
    actions,
    emptyMessage = "No items available",
    renderItemName,
    }: ItemListProps<T>) {

    const getVariantClass = (variant?: string) => {
        switch (variant) {
            case 'primary': return 'primary';
            case 'danger': return 'delete';
            case 'secondary': return 'preview';
            default: return 'download';
        }
    };

    return (
        <div className="items-section">
            {sectionTitle && (
                <div className="items-header">
                    {sectionTitle}
                </div>
            )}

            {items.length > 0 ? (
                <ul className="item-list-container">
                    {items.map((item) => (
                        <li key={item.id} className="item-row">
                            <div className="item-content">
                                {renderItemName ? renderItemName(item) : item.name}
                            </div>
                            <div className="item-actions">
                                {actions.map((action, index) => (
                                    <button
                                        key={index}
                                        className={`action-button ${getVariantClass(action.variant)}`}
                                        onClick={() => action.onClick(item)}
                                        title={action.label}
                                    >
                                        {action.icon}
                                    </button>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty-state">
                    {emptyMessage}
                </div>
            )}
        </div>
    )
}

export default ItemList

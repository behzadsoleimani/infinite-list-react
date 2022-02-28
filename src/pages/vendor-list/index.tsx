import React, { useEffect, useState } from "react";
import ListItems from "../../components/list-items";
import { useDispatch, useSelector } from "react-redux";
import { requestApiData } from "../../redux/action";
import "./index.scss";


export default () => {
  const items = useSelector((state: any) => state.data && state.data.items);
  const filters = useSelector((state: any) => state.data && state.data.filters);
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    fetchData();

    return () => {
      window.removeEventListener('scroll', infiniteScroll);

    }
  }, [page]);


  const infiniteScroll = () => {
    // End of the document reached?
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {
      setPage(page + 1)
    }
  }

  const fetchData = async () => {
    dispatch(
      requestApiData(page)
    );

  }

  const handleFilterClick = (value: string) => () => {
    setPage(1);
    dispatch(
      requestApiData(1, value)
    );
  }

  const removeFilter = () => {
    setPage(1);
    dispatch(
      requestApiData(1, "")
    );
  }

  const title = items.filter((item: any) => item.type === "TEXT");

  return (
    <>
      <div className={"main"}>
        <div className={"filters"}>
          {(filters || []).map((filter: any) => (
            <div key={filter.value} className={filter.selected ? "filters__row--active" : "filters__row--deactive"} ><span onClick={handleFilterClick(filter.value)}>{filter.title}</span>
              {filter.selected && <img onClick={removeFilter} className={"filters__row--img"} src="/img/closeIcond.png" />}
            </div>
          ))}
        </div>

          <h4>
            {title && title.length ? title[0].data : ""}
          </h4>
        <div className={"main__items"}>
          <ListItems />
        </div>
      </div>
    </>
  );
};

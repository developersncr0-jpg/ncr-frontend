import React from 'react';
import './ManagerView.css';

const caseData = [
  {
    status: '2.1 Private Company',
    value1: '78602',
    value2: '78602',
    date: 'Oct. 3. 2021',
    incomeTax: 'Mar. 31. 2022',
    vat: '1268055029'
  },
  {
    status: '2.1 Private Company',
    value1: '01403',
    value2: '01403',
    date: 'Dec 19. 2022',
    incomeTax: 'Sep. 30. 2023',
    vat: '0831270503'
  },
  {
    status: '2.1 Private Company',
    value1: '07762',
    value2: '07762',
    date: 'Nov 6. 2021',
    incomeTax: 'Feb. 28. 2022',
    vat: '0914376249'
  },
  {
    status: '2.3 Partnership',
    value1: '27516',
    value2: '27516',
    date: 'Sep 20. 2022',
    incomeTax: 'Jun. 30. 2023',
    vat: '2384306184'
  },
  {
    status: '2.3 Partnership',
    value1: '24108',
    value2: '24108',
    date: 'Mar 15. 2023',
    incomeTax: 'Jul. 31. 2023',
    vat: '3410851830'
  }
];

const ManagerView: React.FC = () => {
  return (
    <div className="manager-container">
      <h1 className="title">Cases</h1>
      <div className="search-filter">
        <input type="text" placeholder="Search grid" className="search-box" />
        <button className="filter-btn">Filter ▾</button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Legal status<br />(Ples-tick appropriate box)</th>
              <th>2.1 Private Company</th>
              <th>2.4 Close Corporation</th>
              <th>2.5 Co➿</th>
              <th>Ofore-Corporation</th>
              <th>Income Tax registration number</th>
              <th>VAT registration number</th>
            </tr>
          </thead>
          <tbody>
            {caseData.map((row, index) => (
              <tr key={index}>
                <td className="link">{row.status}</td>
                <td>{row.value1}</td>
                <td>—</td>
                <td>—</td>
                <td>{row.date}</td>
                <td>{row.incomeTax}</td>
                <td>{row.vat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerView;

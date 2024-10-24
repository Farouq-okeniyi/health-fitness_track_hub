!pip install deap
import warnings
warnings.simplefilter(action='ignore')
import pandas as pd
import numpy as np
import random
from deap import base, creator, tools, algorithms
from sklearn.metrics import mean_squared_error
import os

# Function to read data from files
def read_data(data_directory, frequencies, bandwidths, unit, height, eirp):
    aggregated_national_df = pd.DataFrame()

    zones = [i for i in os.listdir(national_directory)]
    print(f'zones: {zones}')
    for zone in zones:
        states = [i for i in os.listdir(f'{data_directory}/{zone}') if i != f'{zone}-Processed']
        for state in states:
            parent_dir = f'{data_directory}/{zone}/{state}/{response.upper()}/'
            for freq in frequencies:
                path_freq = f'{parent_dir}{freq}{unit}/'
                for band in bandwidths:
                    path_band = f'{path_freq}{band}MHz_'
                    for heig in height:
                        full_path = f'{path_band}{heig}m_VV.csv'
                        try:
                            # Reading Data
                            df = pd.read_csv(full_path)

                            # Filter out rows with zero distance to server
                            df = df[df['Distance To Server 1 (km)'] != 0]

                            # Convert distance to meters and calculate path loss (PL)
                            df['Distance'] = df['Distance To Server 1 (km)'] * 1000
                            df['PL'] = abs(df["Server 1 Result (dBmW)"]) + eirp

                            # Append to the aggregated national DataFrame
                            aggregated_national_df = pd.concat([aggregated_national_df, df], ignore_index=True)

                        except FileNotFoundError:
                            print(f'File not found: {full_path}')
                        except pd.errors.EmptyDataError:
                            print(f'Empty data in file: {full_path}')
                        except Exception as e:
                            print(f'Error processing file {full_path}: {str(e)}')

    return aggregated_national_df

# Function to evaluate FI model fitness
def evaluate_fi(individual, data):
    beta, alpha = individual
    data['Predicted_PL'] = beta + alpha * np.log10(data['Distance'])
    mse = mean_squared_error(data['PL'], data['Predicted_PL'])
    return mse,

# Function to evaluate CI model fitness
def evaluate_ci(individual, data):
    FSPL_d0, X_ci, PLE = individual
    data['Predicted_PL'] = FSPL_d0 + X_ci + PLE * np.log10(data['Distance'])
    mse = mean_squared_error(data['PL'], data['Predicted_PL'])
    return mse,

# Main execution flow
if __name__ == '__main__':
    # Change the directory to that of the folder containing entire data for the country.
    national_directory = '/content/drive/MyDrive/NE extracted'

    
    freq_FR1 = ['800', '1800', '2100', '2600', '3300', '3500', '3700', '4500', '4800', '5900']
    band_FR1 = ['20', '50', '100']
    freq_FR2 = ['24', '26', '28', '36', '38', '43', '45', '47', '48', '66']
    band_FR2 = ['100', '200', '400']
    height = ['10', '15', '25']
    eirp_FR1 = 59
    eirp_FR2 = 63

    # Selecting Frequency Band (FR1 or FR2)
    while True:
        response = input("Enter the frequency band you want to process? (Hint FR1 or FR2) ").lower()

        if response == 'fr1':
            frequencies = freq_FR1
            bandwidths = band_FR1
            unit = 'MHz'
            eirp = eirp_FR1
            break
        elif response == 'fr2':
            frequencies = freq_FR2
            bandwidths = band_FR2
            unit = 'GHz'
            eirp = eirp_FR2
            break
        else:
            print('Invalid input. Please enter "FR1" or "FR2".')

    # Read and process data (for all frequencies together)
    aggregated_national_df = read_data(national_directory, frequencies, bandwidths, unit, height, eirp)

    # Perform GA optimization for FI model (single model for all frequencies)
    # Define GA parameters for FI model
    creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
    creator.create("Individual", list, fitness=creator.FitnessMin)

    toolbox = base.Toolbox()
    toolbox.register("attr_float_fi_beta", random.uniform, -100, 100)
    toolbox.register("attr_float_fi_alpha", random.uniform, 0.1, 10)
    toolbox.register("individual_fi", tools.initCycle, creator.Individual, (toolbox.attr_float_fi_beta, toolbox.attr_float_fi_alpha), n=1)
    toolbox.register("population_fi", tools.initRepeat, list, toolbox.individual_fi)
    toolbox.register("mate", tools.cxBlend, alpha=0.5)
    toolbox.register("mutate", tools.mutGaussian, mu=0, sigma=1, indpb=0.2)
    toolbox.register("select", tools.selTournament, tournsize=3)
    toolbox.register("evaluate", evaluate_fi, data=aggregated_national_df)

    # Example of running GA (adjust as per your needs)
    pop_fi = toolbox.population_fi(n=50)
    hof_fi = tools.HallOfFame(1)
    stats_fi = tools.Statistics(lambda ind: ind.fitness.values)
    stats_fi.register("min", np.min)
    pop_fi, log_fi = algorithms.eaSimple(pop_fi, toolbox, cxpb=0.5, mutpb=0.2, ngen=40, stats=stats_fi, halloffame=hof_fi, verbose=False)

    best_ind_fi = hof_fi[0]
    beta_fi, alpha_fi = best_ind_fi
    fi_model = f'PL(d) = {beta_fi:.2f} + {alpha_fi:.3f}log(d)'
    rmse_fi = round(np.sqrt(min(log_fi.select("min"))), 4)

    # Perform GA optimization for CI model (single model for all frequencies)
    toolbox.unregister("attr_float_fi_beta")
    toolbox.unregister("attr_float_fi_alpha")
    toolbox.register("attr_float_ci_FSPL_d0", random.uniform, 50, 100)
    toolbox.register("attr_float_ci_X_ci", random.uniform, 0, 10)
    toolbox.register("attr_float_ci_PLE", random.uniform, 0.1, 10)
    toolbox.register("individual_ci", tools.initCycle, creator.Individual, (toolbox.attr_float_ci_FSPL_d0, toolbox.attr_float_ci_X_ci, toolbox.attr_float_ci_PLE), n=1)
    toolbox.register("population_ci", tools.initRepeat, list, toolbox.individual_ci)
    toolbox.register("evaluate", evaluate_ci, data=aggregated_national_df)

    pop_ci = toolbox.population_ci(n=50)
    hof_ci = tools.HallOfFame(1)
    stats_ci = tools.Statistics(lambda ind: ind.fitness.values)
    stats_ci.register("min", np.min)
    pop_ci, log_ci = algorithms.eaSimple(pop_ci, toolbox, cxpb=0.5, mutpb=0.2, ngen=40, stats=stats_ci, halloffame=hof_ci, verbose=False)

    best_ind_ci = hof_ci[0]
    FSPL_d0, X_ci, PLE = best_ind_ci
    ci_model = f'PL(d) = {FSPL_d0:.2f} + {X_ci:.2f}log(d)'
    rmse_ci = round(np.sqrt(min(log_ci.select("min"))), 4)

    # Store results (only one model for all frequencies)
    result_df = pd.DataFrame({
        'FI_Model': [fi_model],
        'FI_RMSE': [rmse_fi],
        'CI_Model': [ci_model],
        'CI_RMSE': [rmse_ci]
    })

    # Save results to CSV (adjust path as per your needs)
    result_df.to_csv(f'{national_directory}/National-optimized_single_model.csv', index=False)
